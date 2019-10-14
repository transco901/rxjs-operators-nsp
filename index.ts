import { of, Observable } from 'rxjs'; 
import { map, switchMap } from 'rxjs/operators';

/***********************  map  ***********************/

// Source observable.
// of(): Converts the arguments to an observable sequence.
// pipe(): takes as its arguments the functions you want to combine, and 
// returns a new function that, when executed, runs the composed 
// functions in sequence.

// A set of operators applied to an observable is a recipe—that is, a 
// set of instructions for producing the values you’re interested in. By 
// itself, the recipe doesn’t do anything. You need to call subscribe() 
// to produce a result through the recipe.

// 1. basic example
const source = of('World', 'Houston', 'Insperity').pipe(
  map(x => `Hello ${x}!`) // transforming each value in the stream
);

// Subscribe/Listen
source.subscribe(x => console.log(x));

// 2. use case
class Employee {
  name: string;
  perId: number;
}

var employee: Employee;

function getEmployee() {
  return of({name: 'Maria Gomez', perId:3211});
}

getEmployee().pipe(
  map(ee => { 
    employee = ee;
    console.log(`Employee mapped: ${employee.name}, ${employee.perId}`);
  })).subscribe();

/***********************  switchMap  ***********************/



