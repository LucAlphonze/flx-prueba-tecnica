-- En este archivo deben estar tus ejercicios de consultas sql

-- utilice psql sintaxis para hacer las queries

-- **Empleados ordenados alfabéticamente (Z...A):** 
" 
SELECT NOMBRE, APELLIDO
FROM EMPLEADOS
ORDER BY APELLIDO DESC;
"

-- **Empleados de Soporte:**  
" 
SELECT empleados.nombres, puestos.puesto, localidades.localidad
FROM public.empleados 
LEFT JOIN public.puestos 
ON puesto_id = puestos.id
LEFT JOIN public.departamentos
ON empleados.departamento_id = departamentos.id
LEFT JOIN public.localidades
ON departamentos.localidad_id = localidades.id
Where puesto = 'Soporte';
"
-- **Nombres que terminan con 'o':**  
"
SELECT empleados.apellidos
FROM public.empleados
WHERE empleados.apellidos LIKE '%o';
"
-- **Empleados en Carlos Paz:**  
"
SELECT empleados.nombres, empleados.sueldo, localidades.localidad
FROM public.empleados 
LEFT JOIN public.departamentos
ON empleados.departamento_id = departamentos.id
LEFT JOIN public.localidades
ON departamentos.localidad_id = localidades.id
Where localidades.localidad = 'Carlos Paz';
"

-- **Sueldos entre 10000 y 13000:**  
"
SELECT empleados.nombres, empleados.sueldo, localidades.localidad
FROM public.empleados 
LEFT JOIN public.departamentos
ON empleados.departamento_id = departamentos.id
LEFT JOIN public.localidades
ON departamentos.localidad_id = localidades.id
Where empleados.sueldo BETWEEN 10000 AND 13000;
"
-- **Departamentos con más de 5 empleados:**  
"
SELECT departamentos.id, departamentos.denominacion, COUNT(empleados.departamento_id)
FROM public.departamentos
RIGHT JOIN public.empleados ON empleados.departamento_id = departamentos.id
GROUP BY departamentos.id, departamentos.denominacion
HAVING COUNT(empleados.departamento_id) > 5;
"

-- **Empleados en Córdoba con puesto de Analista o Programador:**  
"
SELECT empleados.nombres, empleados.apellidos
FROM public.empleados 
LEFT JOIN public.puestos 
ON puesto_id = puestos.id
LEFT JOIN public.departamentos
ON empleados.departamento_id = departamentos.id
LEFT JOIN public.localidades
ON departamentos.localidad_id = localidades.id
WHERE localidad = 'Cordoba'AND
puesto = 'Analista' OR puesto = 'programador';
"

-- **Sueldo medio de todos los empleados:**  
"
SELECT AVG(empleados.sueldo) as sueldoMedio
FROM public.empleados;
"

-- **Máximo sueldo en el departamento 10:** 
"
SELECT MAX(empleados.sueldo) as sueldoMaximo
FROM public.empleados
WHERE departamento_id = 10;
"
-- **Sueldo mínimo en el departamento Soporte:**
"
SELECT MIN(empleados.sueldo) as sueldoMaximo 
FROM public.empleados
LEFT JOIN public.departamentos 
ON empleados.departamento_id = departamentos.id
WHERE denominacion = 'Soporte';
"

-- **Suma de sueldos por puesto:** 
"
SELECT puestos.puesto,SUM(empleados.sueldo) as sumaSueldo 
FROM public.empleados
LEFT JOIN public.puestos 
ON puesto_id = puestos.id
GROUP BY puesto;
"