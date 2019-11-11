import { Observable, of, from, interval, fromEvent } from "rxjs";
import { 
  tap,
  map,
  switchMap,
  delay,
  concatMap,
  filter,
  catchError,
  debounceTime,
  distinctUntilChanged,
  take
} from "rxjs/operators";


/****************************  map and filter ****************************/
console.clear();

class Employee {
  name: string;
  perId: number;
  companyId: number;
  age: number;
}

function transformToEmployee(ee: any): Employee {
  const newEE = new Employee();  
  newEE.name = ee.name;
  newEE.perId = ee.perId;
  newEE.companyId = ee.companyId;
  newEE.age = getAge(ee.birthDate);
  return newEE;
}

function getAge(birthDate: Date) {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

let employees = new Array<Employee>();

function getEmployees() {  
  let employees = [
    { name: "Ben Jones", perId: 3211, companyId: 8100, birthDate: new Date(1984, 11, 1) },
    { name: "John Barnaby", perId: 4212, companyId: 9200, birthDate: new Date(2000, 11, 1) },
    { name: "Joyce Barnaby", perId: 4213, companyId: 8100, birthDate: new Date(1987, 1, 1) },
    { name: "Charlie Nelson", perId: 5213, companyId: 9200, birthDate: new Date(2001, 4, 4) },
    { name: "Kate Wilding", perId: 5214, companyId: 9200, birthDate: new Date(1993, 10, 12) },
    { name: "Gavin Troy", perId: 5215, companyId: 8100, birthDate: new Date(1977, 1, 19) }
  ];

  //from(): Converts it's argument to a sequence of observables
  return from(employees).pipe(concatMap(ee => of(ee).pipe(delay(500))));
}

// pipe(): takes as its arguments the functions you want to combine (a.k.a. a recipe), and returns a new function that, when executed, runs the composed functions in sequence
getEmployees()
  .pipe(
    //filter(ee => ee.companyId === 8100),
    map(ee => {
      const employee: Employee = transformToEmployee(ee);
      employees.push(employee);
      console.log(`Name: ${employee.name}, id: ${employee.perId}, age: ${employee.age}`)
    })
  );
  // subscribe() adds an observer which triggers the 'lazy' observable to start pushing values
  //.subscribe();


/************************  switchMap, distinctUntilChanged, debounceTime ************************/
// console.clear();
// // switchMap() - type ahead search - only interested in latest input; cancel the rest.
// // debounceTime() - delay and only the most recent value from each burst of emissions.  wait for the user input to stabilize
// // distinctUntilChange() - Only emit when the current value is different than the last (avoid duplicate seraches).

// document.getElementById("divForSearchBox").style.visibility = 'visible';

// fromEvent(document,'keyup').pipe(
//   debounceTime(400),
//   distinctUntilChanged(),
//   switchMap(() => filterSearchItems()))
//   .subscribe();

// function filterSearchItems() {
//     var input, filter, ul, li, a, i, txtValue;
//     input = document.getElementById("searchBox");
//     filter = input.value.toUpperCase();

//     console.log(`filter text: ${filter}`)
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
