///<reference path="./index.d.ts" />

export module Linq {

    // interface Array<T> {
    //     firstOrDefault(predicate: Function): T;
    //   }

    //let test :Guid = new Guid();

    Array.prototype.firstOrDefault = function(predicate: Function){
      
      return this.reduce( (accumulator, currentValue) => {

          if(!accumulator && predicate(currentValue)) 
            accumulator = currentValue;
          
          return accumulator;
        }, null);
      }
}



