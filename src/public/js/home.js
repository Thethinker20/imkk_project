$(document).bind("contextmenu",function(e) {
    e.preventDefault();
   });
   
   $(document).keydown(function(e){
       if(e.which === 123){
          return false;
       }
   });

// function removeKeys(x) {
//     if (x.matches) { // If media query matches
//         document.querySelectorAll('#piano_keys > span(-n+10)').forEach(n => {
//             n.parentNode.removeChild(n)
//           })
//     } else {
//       document.getElementById("divIWantedToHide").style.visibility = "visible";
//     }
//   }
  
//   var x = window.matchMedia("(min-width: 390px)")
//   removeKeys(x) // Call listener function at run time
//   x.addListener(removeKeys)