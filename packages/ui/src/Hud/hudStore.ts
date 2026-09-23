type Listener = () => void;

let visible = false;
const listeners = new Set<Listener>();

function emit() {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeHud(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getHudVisible() {
  return visible;
}

export function showHud() {
  if (visible) {
    return;
  }
  visible = true;
  emit();
}

export function hideHud() {
  if (!visible) {
    return;
  }
  visible = false;
  emit();
}

export function resetHud() {
  hideHud();
}
