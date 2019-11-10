import { Observable, of, from, interval, fromEvent } from "rxjs";
import {
  map,
  switchMap,
  delay,
  concatMap,
  filter,
  catchError,
  debounceTime,
  distinctUntilChanged
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

/****************************  map and filter ****************************/
console.clear();

class Employee {
  name: string;
  perId: number;
  companyId: number;
}

var employee: Employee;

function getEmployees() {
  let employees: Employee[] = [
    { name: "Ben Jones", perId: 3211, companyId: 8100 },
    { name: "John Barnaby", perId: 4212, companyId: 9200 },
    { name: "Joyce Barnaby", perId: 4213, companyId: 8100 },
    { name: "Charlie Nelson", perId: 5213, companyId: 9200 },
    { name: "Kate Wilding", perId: 5214, companyId: 9200 },
    { name: "Gavin Troy", perId: 5215, companyId: 8100 }
  ];

  //from(): Converts it's argument to a sequence of observables
  return from(employees).pipe(concatMap(ee => of(ee).pipe(delay(500))));
}

// pipe(): takes as its arguments the functions you want to combine (a.k.a. a recipe), and returns a new function that, when executed, runs the composed functions in sequence
getEmployees()
  .pipe(
    filter(ee => ee.companyId === 8100),
    map(ee => {
      employee = ee;
      console.log(`Employee mapped: ${employee.name}, ${employee.perId}, : ${employee.companyId}`)
    })
  )
  // subscribe() adds an observer which triggers the 'lazy' observable to start pushing values
  .subscribe();


/************************  switchMap, distinctUntilChanged, debounceTime ************************/
// console.clear();
// // switchMap() - type ahead search - only interested in latest input; cancel the rest.
// // debounceTime() - delay and only the most recent value from each burst of emissions.
// // distinctUntilChange() - Only emit when the current value is different than the last.

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
//     return new Observable();
// }
