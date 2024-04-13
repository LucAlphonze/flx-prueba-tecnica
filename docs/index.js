/*
  Ejercicio 1: Reverse a String
  Escribe una función reverseString que tome una cadena como entrada y devuelva la cadena invertida.
*/

function reverseString(str) {
  // Tu solución acá
  const strRev = str.split("").reverse().join("");
  return strRev;
}

/*
  Ejercicio 2: Check for Palindrome
  Escribe una función isPalindrome que tome una cadena como entrada 
  y devuelva true si la cadena es un palíndromo, y false en caso contrario.
*/
function isPalindrome(str) {
  // Tu solución acá
  var len = Math.floor(str.length / 2);
  for (var i = 0; i < len; i++)
    if (str[i] !== str[str.length - i - 1]) return false;
  return true;
}

/*
  Ejercicio 3: Find the Nearest Pair
  Dado un array de números enteros, 
  encuentra el par de elementos cuya diferencia es mínima. 
  En otras palabras, encuentra dos números en el array que 
  estén más cerca el uno del otro en términos de valor absoluto.

  Ejemplo:

  Entrada: [4, 2, 1, 7, 9, 10]
  Salida: [1, 2]
*/

function closestPair(arr) {
  // Tu solución acá
  arr.sort((a, b) => a - b);

  // Find the minimum absolute difference between pairs
  let min_diff = Number.MAX_VALUE;
  let pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      let diff = Math.abs(arr[i] - arr[j]);
      if (diff < min_diff) {
        min_diff = diff;
        pairs = [[arr[i], arr[j]]];
      } else if (diff == min_diff) {
        pairs.push([arr[i], arr[j]]);
      }
    }
  }

  return pairs[0];
}
/*
  Ejercicio 4: Calculadora - Programación Orientada a Objetos
  La calculadora debe ser capaz de realizar operaciones aritméticas básicas, 
  como suma, resta, multiplicación y división. 
  Además, debe mantener un registro del último resultado calculado 
  para que los usuarios puedan acceder a él si es necesario.

  La calculadora debe ser una clase llamada Calculator, que tenga los siguientes métodos:
  - add(a, b): Este método toma dos números como argumentos y devuelve la suma de los mismos. 
    Además, actualiza el último resultado calculado.

  - subtract(a, b): Este método toma dos números como argumentos y devuelve la resta del primero menos el segundo. 
    Además, actualiza el último resultado calculado.

  - multiply(a, b): Este método toma dos números como argumentos y devuelve el producto de los mismos. 
    Además, actualiza el último resultado calculado.

  - divide(a, b): Este método toma dos números como argumentos y devuelve el cociente del primero dividido por el segundo.
    Si el segundo número es cero, se debe lanzar un error indicando que la división por cero no está permitida. 
    Además, actualiza el último resultado calculado.

  - getLastResult(): Este método devuelve el último resultado calculado por la calculadora, simulando un historial.

  Además de estos métodos, debes agregar una función más compleja a la clase Calculator, 
  que calcule la potencia de un número. 
  Esta función debe ser asignada al prototipo de la clase y se llamará exponentiate(base, exponent). 
  Esta función toma dos argumentos: la base y el exponente, y devuelve la base elevada a la potencia del exponente. 
  La función debe manejar correctamente los casos donde el exponente es cero o negativo, lanzando un error en este último caso.
  Además, actualiza el último resultado calculado.

*/

class Calculator {
  // Tu solución acá
  lastResult;
  add(a, b) {
    var addition = a + b;
    this.lastResult = addition;
    return addition;
  }
  subtract(a, b) {
    var subtraction = a - b;
    this.lastResult = subtraction;
    return subtraction;
  }
  multiply(a, b) {
    var multiplication = a * b;
    this.lastResult = multiplication;
    return multiplication;
  }
  divide(a, b) {
    var division = a / b;
    this.lastResult = division;
    if (b === 0) {
      throw new Error("Division by zero is not allowed");
    }
    return division;
  }
  exponentiate(base, exponent) {
    var power = Math.pow(base, exponent);
    if (exponent < 0) {
      throw new Error("Exponentiation with negative exponent is not allowed");
    } else {
      this.lastResult = power;
      return power;
    }
  }
  getLastResult() {
    return this.lastResult;
  }
}

module.exports = {
  closestPair,
  isPalindrome,
  reverseString,
  Calculator,
};
