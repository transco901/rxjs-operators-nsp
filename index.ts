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

/********* getting started *********/
// const source = of('World', 'Houston', 'Insperity');

// source.pipe( 
//     map(x => `Hello ${x}!`) 
//   );

// Subscribe/Listen
//source.subscribe(x => console.log(x));

/********* transform data *********/
// class Employee {
//   name: string;
//   perId: number;
// }

// var employee: Employee;

// function getEmployee() {
//   return of({name: 'Maria Gomez', perId:3211});
// }

// getEmployee().pipe(
//   map(ee => {
//     employee = ee;
//     console.log(`Employee mapped: ${employee.name}, ${employee.perId}`);
//   })).subscribe();

/***********************  switchMap  ***********************/



