// $(window).scroll(function(){
//     if($(this).scrollTop() > 100){
//         $('.nav').addClass('sticky')
//     } else{
//         $('.nav').removeClass('sticky')
//     }
//   });

// const navbar = document.querySelector('.nav');

// function stickyNavbar() {
//   if (window.scrollY > 0) {
//     navbar.classList.add('sticky');
//   } else {
//     navbar.classList.remove('sticky');
//   }
// }

// window.addEventListener('scroll', stickyNavbar);


// app .js 
// $('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
//     var $this = $(this),
//         label = $this.prev('label');
  
//         if (e.type === 'keyup') {
//               if ($this.val() === '') {
//             label.removeClass('active highlight');
//           } else {
//             label.addClass('active highlight');
//           }
//       } else if (e.type === 'blur') {
//           if( $this.val() === '' ) {
//               label.removeClass('active highlight'); 
//               } else {
//               label.removeClass('highlight');   
//               }   
//       } else if (e.type === 'focus') {
        
//         if( $this.val() === '' ) {
//               label.removeClass('highlight'); 
//               } 
//         else if( $this.val() !== '' ) {
//               label.addClass('highlight');
//               }
//       }
  
//   });
  
//   $('.tab a').on('click', function (e) {
    
//     e.preventDefault();
    
//     $(this).parent().addClass('active');
//     $(this).parent().siblings().removeClass('active');
    
//     target = $(this).attr('href');
  
//     $('.tab-content > div').not(target).hide();
    
//     $(target).fadeIn(600);
    
//   });