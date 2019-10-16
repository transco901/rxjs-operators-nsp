import { Observable, of, from, interval, fromEvent } from 'rxjs';
import { map, switchMap, delay, concatMap, filter, catchError, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

/****************************  map  ****************************/

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

// //Subscribe- activate the observable and listen for emitted values.
// source.subscribe(x => console.log(x));

/********* transform data *********/
// class Employee {
//   name: string;
//   perId: number;
// }

// var employee: Employee;

// function getEmployees() {
//   var employees = [ 
//       {name: 'Maria Gomez', perId:3211}, 
//       {name: 'John Barnaby', perId:4212}, 
//       {name: 'Rick Johnson', perId:5213} 
//   ];

//   return from(employees).pipe(
//     concatMap( ee => of(ee).pipe( delay(1500))));
//   }

// getEmployees().pipe(
//   map(ee => {
//     employee = ee;
//     console.log(`Employee mapped: ${employee.name}, ${employee.perId}`);
//   })).subscribe();


/****************************  fromEvent and filter  ****************************/

// document.getElementById("divForClicks").style.visibility = 'visible';

// var clicks = fromEvent(document, 'click');

// var clicksOnSpans = clicks.pipe(
//     filter( (event: Event, index: number) => {
//       return (<Element>event.target).tagName == "SPAN";
//     }));

// clicksOnSpans.subscribe(x => console.log(`span clicked!`))


/****************************  catchError  ****************************/
// const loadData = fromEvent(document, 'click');

// // When we click 'load', trigger an http event
// loadData.pipe(
//   concatMap(() => ajax.get('http://this/will/404').pipe(
//     catchError(err => {
//       //side effect, to log something happened
//       console.log(`An error occurred while loading: ${err}`);
//       //return different Observable
//       return of({message: 'We noticed an error.'});
//     })
//   ))
// ).subscribe(x => console.log(x));

/**************************  switchMap, distinctUntilChanged  **************************/

// swtichMap() - type ahead search - only interested in latest input; cancel the rest.
// distinctUntilChange() - Only emit when the current value is different than the last.

// document.getElementById("divForSearchBox").style.visibility = 'visible';

// fromEvent(document,'keyup').pipe(
//   debounceTime(300),
//   distinctUntilChanged(),
//   switchMap(val => filterSearchItems()))
//   .subscribe();

// function filterSearchItems() {
//     var input, filter, ul, li, a, i, txtValue;
//     input = document.getElementById("searchBox");
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("searchResultList");
//     li = ul.getElementsByTagName("li");
    
//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("a")[0];
//         txtValue = a.textContent || a.innerText;
//         li[i].style.display = (txtValue.toUpperCase().indexOf(filter) > -1) ?
//           "" : "none";
//     }
//     return new Observable(); // weird?
// }