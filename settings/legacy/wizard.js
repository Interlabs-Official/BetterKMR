document.addEventListener("DOMContentLoaded", function () {
    // Define our wizard steps by id (we already have #welcome and #upload in HTML)
    const steps = ["welcome", "upload", "resolution", "finish"];
    let currentStepIndex = 0;
    let uploadedImageDataURL = "";
    let selectedResolution = 0;
    let uploadedImage = new Image();
  
    // Helper: show the step corresponding to the given index.
    function showStep(index) {
      // Hide all wizard steps (existing in the container)
      document.querySelectorAll(".wizard-step").forEach((el) => {
        el.classList.remove("active");
      });
      // Show the step whose id is steps[index]
      const stepEl = document.getElementById(steps[index]);
      if (stepEl) {
        stepEl.classList.add("active");
      }
      currentStepIndex = index;
    }
  
    // Global delegation for our Next and Back buttons.
    document.querySelector(".wizard-container").addEventListener("click", function (e) {
      // Next button was clicked (either the one in the HTML or ones we add dynamically)
      if (e.target.matches("#nextButton") || e.target.matches(".next-button")) {
        if (currentStepIndex === 0) {
          // Step 0: Welcome – move to upload step
          showStep(1);
        } else if (currentStepIndex === 1) {
          // Step 1: Upload – ensure an image file is selected
          if (!uploadedImageDataURL) {
            alert("Please select an image file before proceeding.");
            return;
          }
          // If the resolution step does not exist yet, create it.
          if (!document.getElementById("resolution")) {
            createResolutionStep();
          }
          showStep(2);
        } else if (currentStepIndex === 2) {
          // Step 2: Resolution – make sure a resolution is selected.
          if (!selectedResolution) {
            alert("Please select a resolution.");
            return;
          }
          // If the finish step does not exist yet, create it.
          if (!document.getElementById("finish")) {
            createFinishStep();
          } else {
            // Otherwise update it (in case user goes back and changes their selection)
            updateFinishStep();
          }
          showStep(3);
        }
      }
      // Back button was clicked.
      if (e.target.matches("#backButton")) {
        // Do nothing if we're on the first step.
        if (currentStepIndex === 0) return;
        showStep(currentStepIndex - 1);
      }
    });
  
    // Handle file upload changes.
    const fileInput = document.getElementById("fileUpload");
    fileInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
            uploadedImageDataURL = event.target.result;
      
            // Update the preview image in the upload step
            document.getElementById("imagePreview").src = uploadedImageDataURL;
      
            // Update the image in the resolution step if it exists
            document.querySelectorAll(".resolution-option img").forEach((img) => {
              img.src = uploadedImageDataURL;
            });
      
            // Also create a new Image object for further processing
            uploadedImage = new Image();
            uploadedImage.onload = function () {
              // Reset resolution selection when a new image is uploaded
              selectedResolution = 0;
            };
            uploadedImage.src = uploadedImageDataURL;
          };
          reader.readAsDataURL(file);
        }
      });      
  
    // Create the resolution selection step (Step 2) dynamically.
    function createResolutionStep() {
      const resolutionDiv = document.createElement("div");
      resolutionDiv.id = "resolution";
      resolutionDiv.className = "wizard-step";
  
      // Heading and instruction.
      const heading = document.createElement("div");
      heading.className = "huge-01_5";
      heading.textContent = "Select Resolution";
      resolutionDiv.appendChild(heading);
  
      const instruction = document.createElement("div");
      instruction.className = "huge-02";
      instruction.textContent = "Choose the resolution that's the most optimal for you.";
      resolutionDiv.appendChild(instruction);
  
      // Container for the resolution options.
      const optionsContainer = document.createElement("div");
      optionsContainer.style.display = "flex";
      optionsContainer.style.justifyContent = "center";
      optionsContainer.style.flexWrap = "wrap";
      optionsContainer.style.gap = "20px";
  
      // The list of resolutions.
      const resolutions = [64, 128, 256, 512];
      resolutions.forEach(function (res) {
        // Create an option container.
        const optionDiv = document.createElement("div");
        optionDiv.style.cursor = "pointer";
        optionDiv.style.border = "2px solid transparent";
        optionDiv.style.padding = "10px";
        optionDiv.style.textAlign = "center";
        optionDiv.dataset.resolution = res;
  
        // When clicked, mark this option as selected.
        optionDiv.addEventListener("click", function () {
          // Remove selection styling from all options.
          optionsContainer.querySelectorAll("div").forEach((div) => {
            div.style.border = "2px solid transparent";
          });
          optionDiv.style.border = "2px solid #2979FF";
          selectedResolution = res;
        });
  
        // Create an image preview for the option.
        const imgOption = document.createElement("img");
        imgOption.src = uploadedImageDataURL;
        imgOption.alt = res + "x" + res;
        // Force the image to the option size.
        imgOption.style.width = res + "px";
        imgOption.style.height = res + "px";
        imgOption.style.objectFit = "cover";
        imgOption.style.display = "block";
        imgOption.style.margin = "0 auto 10px";
  
        // Append the image and a label.
        optionDiv.appendChild(imgOption);
        const label = document.createElement("div");
        label.textContent = res + " x " + res;
        optionDiv.appendChild(label);
  
        optionsContainer.appendChild(optionDiv);
      });
      resolutionDiv.appendChild(optionsContainer);

      const sdn = document.createElement("div");
      sdn.className = "huge-03_italic";
      sdn.textContent = "* Higher resolution requires higher storage space and longer load times, but looks better.";
      resolutionDiv.appendChild(sdn);

      const sidenote = document.createElement("div");
      sidenote.className = "huge-03";
      sidenote.textContent = "It's important to choose what's right for you. If you're on a Chromebook, it's best to stick with around 128x128. If you're on a high end device, try 512x512.";
      resolutionDiv.appendChild(sidenote);

      // Add navigation buttons.
      const backBtn = document.createElement("button");
      backBtn.id = "backButton";
      backBtn.className = "button";
      backBtn.textContent = "Back";
      resolutionDiv.appendChild(backBtn);
  
      const nextBtn = document.createElement("button");
      nextBtn.id = "nextButton";
      nextBtn.className = "next-button button";
      nextBtn.textContent = "Next";
      resolutionDiv.appendChild(nextBtn);
  
      document.querySelector(".wizard-container").appendChild(resolutionDiv);
    }
  
    // Create the finish step (Step 3) dynamically.
    function createFinishStep() {
      const finishDiv = document.createElement("div");
      finishDiv.id = "finish";
      finishDiv.className = "wizard-step";
  
      const heading = document.createElement("div");
      heading.className = "huge-01_5";
      heading.textContent = "Finished!";
      finishDiv.appendChild(heading);
  
      const instruction = document.createElement("div");
      instruction.className = "huge-02";
      instruction.textContent = "Your image has been converted.";
      finishDiv.appendChild(instruction);
  
      // Container for the final image preview.
      const finalPreview = document.createElement("div");
      finalPreview.className = "preview-container";
      const finalImage = document.createElement("img");
      finalImage.id = "finalImage";
      finalImage.className = "image-preview";
      finalPreview.appendChild(finalImage);
      finishDiv.appendChild(finalPreview);
  
      // A label and textarea for the Data URL.
      //const dataUrlLabel = document.createElement("div");
      //dataUrlLabel.className = "huge-03";
      //dataUrlLabel.style.marginTop = "20px";
      //dataUrlLabel.textContent = "Data URL:";
      //finishDiv.appendChild(dataUrlLabel);
  
      //const dataUrlText = document.createElement("textarea");
      //dataUrlText.id = "dataUrlText";
      //dataUrlText.rows = 4;
      //dataUrlText.style.width = "100%";
      //finishDiv.appendChild(dataUrlText);
  
      // Navigation button: Back only.
      const backBtn = document.createElement("button");
      backBtn.id = "backButton";
      backBtn.className = "button";
      backBtn.textContent = "Back";
      finishDiv.appendChild(backBtn);

      const finishBtn = document.createElement("button");
      finishBtn.id = "finishButton";
      finishBtn.className = "button";
      finishBtn.textContent = "Finish";
      finishBtn.onclick = function() {
        backToSettings();
      };
      finishDiv.appendChild(finishBtn);
  
      document.querySelector(".wizard-container").appendChild(finishDiv);
  
      // Once created, run the conversion.
      updateFinishStep();
    }
  
    function updateFinishStep() {
        // Create a canvas to draw the cropped square
        const canvas = document.createElement("canvas");
        canvas.width = selectedResolution;
        canvas.height = selectedResolution;
        const ctx = canvas.getContext("2d");
      
        // Determine crop dimensions
        const imgWidth = uploadedImage.width;
        const imgHeight = uploadedImage.height;
        const size = Math.min(imgWidth, imgHeight); // Crop to the smallest side
        const offsetX = (imgWidth - size) / 2; // Center crop horizontally
        const offsetY = (imgHeight - size) / 2; // Center crop vertically
      
        // Draw cropped and resized image on canvas
        ctx.drawImage(
          uploadedImage,
          offsetX, offsetY, size, size, // Crop area
          0, 0, selectedResolution, selectedResolution // Canvas area
        );
      
        // Convert to Data URL
        const dataURL = canvas.toDataURL("image/png");
      
        // Update the final preview image
        document.getElementById("finalImage").src = dataURL;
      
        // Update the Data URL text box
        chrome.storage.local.set({ 'choose_profile_picture': dataURL })
        //document.getElementById("dataUrlText").value = dataURL;
      }
    
      function backToSettings() {
        window.location.href = chrome.runtime.getURL("settings/index.html");
      }
  });