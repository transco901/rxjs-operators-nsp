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

const source = of('World', 'Houston', 'Flower Mound').pipe(
  map(x => `Hello ${x}!`) // transforming each value in the stream
);

// Subscribe/Listen
source.subscribe(x => console.log(x));

/***********************  map  ***********************/



