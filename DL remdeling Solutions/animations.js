/* ===============================
   WAIT FOR PAGE TO LOAD
   =============================== */

/* This runs AFTER the HTML is ready */
document.addEventListener("DOMContentLoaded", function () {

  /* This runs AFTER everything (images, etc.) fully loads */
  window.addEventListener("load", () => {

    /* small delay before intro fades out */
    setTimeout(() => {

      /* adds "fade-out" class to intro screen */
      document.getElementById("intro").classList.add("fade-out");

    }, 500);

  });


  /* ===============================
     UNIVERSAL SLIDER SYSTEM
     =============================== */

  /* function that activates ALL sliders on the page */
  function initializeSliders(){

    /* finds every slider on page */
    const sliders = document.querySelectorAll(".slider");

    /* loop through each slider */
    sliders.forEach(function(slider){

      let index = 0; /* keeps track of current slide */

      /* get parts inside slider */
      const slides = slider.querySelector(".slides");   /* container that moves */
      const slideItems = slider.querySelectorAll(".slide"); /* all images */
      const next = slider.querySelector(".next"); /* right button */
      const prev = slider.querySelector(".prev"); /* left button */

      const totalSlides = slideItems.length;

      /* stop if no slides */
      if(!slides || totalSlides === 0) return;


      /* NEXT BUTTON (go right) */
      if(next){
        next.onclick = function(){

          index++; /* move forward */

          /* loop back to start if at end */
          if(index >= totalSlides){
            index = 0;
          }

          /* move slider */
          slides.style.transform = "translateX(-" + (index * 100) + "%)";
        };
      }


      /* PREVIOUS BUTTON (go left) */
      if(prev){
        prev.onclick = function(){

          index--; /* move backward */

          /* loop to end if below 0 */
          if(index < 0){
            index = totalSlides - 1;
          }

          /* move slider */
          slides.style.transform = "translateX(-" + (index * 100) + "%)";
        };
      }

    });

  }

  /* start sliders */
  initializeSliders();



  /* ===============================
     PROJECT TYPE (MATERIALS + IMAGES)
     =============================== */

  const projectSelect = document.getElementById("projectType");
  const materialsList = document.getElementById("materials");
  const gallery = document.getElementById("projectGallery");


  /* only run if dropdown exists */
  if(projectSelect){

    /* MATERIALS DATA (what each project needs) */
    const projectMaterials = {

      "Bathroom remodel": ["Sink","Toilet","Shower","Tile","Vanity"],

      "Kitchen Remodel": ["Cabinets","Countertops","Sink","Appliances"],

      "Bedroom Remodel": ["Flooring","Paint","Closet Doors"],

      "Home Addition": ["Framing","Drywall","Insulation","Windows"],

      "Whole-House renovation": ["Roofing","Flooring","Electrical","Plumbing"],

      "Cosmic Remodel": ["Galaxy Paint","Star Lighting","Floating Fixtures"]

    };


    /* IMAGES FOR EACH PROJECT */
    const projectImages = {

      "Kitchen Remodel":[
        "https://i.etsystatic.com/5841546/r/il/160bb5/1072050883/il_1588xN.1072050883_pj6v.jpg",
        "https://i.pinimg.com/736x/33/44/76/33447661d5ab8883d2b66e962b37463f.jpg",
        "https://i.pinimg.com/736x/1b/8c/0e/1b8c0e5a9d2f3a7c9e4b6f8d2a1c5e4.jpg"
      ],

      "Bathroom remodel":[
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea"
      ],

      "Bedroom Remodel":[
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
      ],

      "Home Addition":[
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
      ]

    };


    /* WHEN USER CHANGES PROJECT TYPE */
    projectSelect.addEventListener("change", function(){

      /* clear old materials */
      materialsList.innerHTML = "";

      /* get selected options */
      const selectedProjects = Array.from(projectSelect.selectedOptions);



      /* ===============================
         BUILD IMAGE SLIDER
         =============================== */

      if(gallery){

        const slidesContainer = gallery.querySelector(".slides");

        slidesContainer.innerHTML = ""; /* clear old images */

        selectedProjects.forEach(option => {

          const images = projectImages[option.value];

          /* if project has images */
          if(images){

            images.forEach(src =>{

              const img = document.createElement("img");

              img.src = src;
              img.classList.add("slide");

              slidesContainer.appendChild(img);

            });

          }

        });

        /* re-activate slider after adding images */
        initializeSliders();

      }



      /* ===============================
         BUILD MATERIAL CHECKLIST
         =============================== */

      selectedProjects.forEach(option => {

        const projectName = option.value;
        const materials = projectMaterials[projectName];

        /* if project has materials */
        if(materials){

          /* add title */
          const header = document.createElement("h3");
          header.textContent = projectName;
          materialsList.appendChild(header);


          /* add each material as checkbox */
          materials.forEach(material => {

            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = material;

            const label = document.createElement("label");
            label.textContent = " " + material;

            li.appendChild(checkbox);
            li.appendChild(label);

            materialsList.appendChild(li);

          });

        }

      });

    });

  }



  /* ===============================
     ADD-ON PACKAGE SYSTEM
     =============================== */

  const addOnSelect = document.getElementById("addOnSelect");
  const includedList = document.getElementById("included");


  if(addOnSelect){

    /* package data */
    const addOnData = {

      "Basic Package": ["Standard Materials","Basic Finish"],

      "Upgraded Package": ["Premium Materials","Enhanced Finish"],

      "Premium Package": ["Luxury Materials","Custom Finish"],

      "Major Add-On": ["Structural Changes","Permit Handling"]

    };


    /* when user selects add-ons */
    addOnSelect.addEventListener("change", function(){

      includedList.innerHTML = ""; /* clear old list */

      const selectedAddOns = Array.from(addOnSelect.selectedOptions);


      selectedAddOns.forEach(option => {

        const packageName = option.value;
        const items = addOnData[packageName];

        if(items){

          /* add package title */
          const header = document.createElement("h3");
          header.textContent = packageName;
          includedList.appendChild(header);


          /* add each item */
          items.forEach(item => {

            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = item;

            const label = document.createElement("label");
            label.textContent = " " + item;

            li.appendChild(checkbox);
            li.appendChild(label);

            includedList.appendChild(li);

          });

        }

      });

    });

  }

});