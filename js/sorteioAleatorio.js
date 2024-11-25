export default function sortear(){
    const numeros = Array.from({ length: 25 }, (_, i) => i + 1);
    for (let i = numeros.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }
    return numeros.slice(0, 15).sort((a, b) => a - b);
  }