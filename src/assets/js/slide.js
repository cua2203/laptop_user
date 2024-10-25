let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
};

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide_show--image");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
 
  slides[slideIndex-1].style.display = "block";
};
function next(){
    plusSlides(1);

}

setInterval(next,1500);
// setTimeout(plusSlides(1), 1000);