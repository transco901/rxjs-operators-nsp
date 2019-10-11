import { of, Observable } from 'rxjs'; 
import { map, switchMap } from 'rxjs/operators';

// Source observable.

const source = of('World', 'Houston', 'Dallas').pipe(
  map(x => `Hello ${x}!`) // transforming each value in the stream
);

// Subscribe/Listen and react
//source.subscribe(x => console.log(x));

/***********************  map  ***********************/


//const enrolledIds = enrollment.CurrentEnrollments.map((e) => e.CoverageOptionId);



// const observable = new Observable(subscriber => {
//   subscriber.next(1);
//   subscriber.next(2);
//   subscriber.next(3);
//   setTimeout(() => {
//     subscriber.next(4);
//     subscriber.complete();
//   }, 0);
// });

// console.log('just before subscribe');

// observable.subscribe({
//   next(x) { console.log('got value ' + x); },
//   error(err) { console.error('something wrong ocurred: ' + err)},
//   complete() { console.log('done')}
// });

// console.log('just after subscribe');

//************GET THIS WORKING! */
// observable.pipe(
//   switchMap( () ) => console.log('value + 10 = {val}') )
//   );


//*********************** */
//Observable.throw
//
 //.catch((error: any) => Observable.throw({ message: 'Error occured when trying to get the data.' +        //error.message }));

