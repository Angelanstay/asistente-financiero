(() => {
  'use strict';

  // --- Contrato con el backend (ajustar solo aquí si tu chat.php usa otros nombres) ---
  const ENDPOINT = 'backend/chat.php';
  const MAX_HISTORIAL = 6; // últimos mensajes que se envían como contexto

  async function enviarAlBackend(mensaje, historial) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje, historial })
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    const respuesta = data.respuesta || data.reply || data.message;
    if (!respuesta) throw new Error('Respuesta vacía');
    return respuesta;
  }

  // --- Elementos ---
  const tab = document.getElementById('chat-toggle');
  const panel = document.getElementById('chat-panel');
  const btnMinimizar = document.getElementById('chat-minimize');
  const lista = document.getElementById('chat-messages');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const btnEnviar = document.getElementById('chat-send');

  const historial = []; // [{ rol: 'user' | 'assistant', texto }]
  let enviando = false;

  // --- Abrir / minimizar (la conversación queda en el DOM) ---
  function abrir(visible) {
    panel.hidden = !visible;
    tab.setAttribute('aria-expanded', String(visible));
    if (visible) {
      input.focus();
      bajarScroll();
    }
  }

  tab.addEventListener('click', () => abrir(panel.hidden));
  btnMinimizar.addEventListener('click', () => { abrir(false); tab.focus(); });
  panel.addEventListener('keydown', (e) => { if (e.key === 'Escape') abrir(false); });
  document.querySelectorAll('[data-open-chat]').forEach((b) => b.addEventListener('click', () => abrir(true)));

  // --- Mensajes ---
  function bajarScroll() {
    lista.scrollTop = lista.scrollHeight;
  }

  // Muestra texto sin usar innerHTML; convierte **negrita** y viñetas simples.
  function escribirTexto(contenedor, texto) {
    texto.split(/\n+/).filter(Boolean).forEach((linea) => {
      const p = document.createElement('p');
      const limpia = linea.replace(/^\s*[*-]\s+/, '• ');
      limpia.split(/(\*\*[^*]+\*\*)/).forEach((trozo) => {
        if (trozo.startsWith('**') && trozo.endsWith('**') && trozo.length > 4) {
          const b = document.createElement('strong');
          b.textContent = trozo.slice(2, -2);
          p.appendChild(b);
        } else {
          p.appendChild(document.createTextNode(trozo));
        }
      });
      contenedor.appendChild(p);
    });
  }

  function agregarMensaje(rol, texto) {
    const div = document.createElement('div');
    div.className = 'message ' + (rol === 'user' ? 'message-user' : 'message-assistant');
    escribirTexto(div, texto);
    lista.appendChild(div);
    bajarScroll();
  }

  function mostrarEscribiendo() {
    const div = document.createElement('div');
    div.className = 'message message-assistant message-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    lista.appendChild(div);
    bajarScroll();
    return div;
  }

  // --- Envío ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const mensaje = input.value.trim();
    if (!mensaje || enviando) return;

    enviando = true;
    btnEnviar.disabled = true;
    input.value = '';
    agregarMensaje('user', mensaje);
    const escribiendo = mostrarEscribiendo();
    const contexto = historial.slice(-MAX_HISTORIAL);

    try {
      const respuesta = await enviarAlBackend(mensaje, contexto);
      historial.push({ rol: 'user', texto: mensaje }, { rol: 'assistant', texto: respuesta });
      escribiendo.remove();
      agregarMensaje('assistant', respuesta);
    } catch (error) {
      escribiendo.remove();
      agregarMensaje('assistant', 'No pude conectarme con el asistente. Revisa que Apache esté activo e inténtalo de nuevo.');
      console.error(error);
    } finally {
      enviando = false;
      btnEnviar.disabled = false;
      input.focus();
    }
  });
})();