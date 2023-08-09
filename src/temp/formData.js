 // const formData = new FormData();
      // formData.append("uploadedImage", uploadedImage)
      // formData.append("imageName", formState.inputs.imageName.value);
      // formData.append("imagePrompt", formState.inputs.imagePrompt.value);
      // formData.append("aspectRatio", formState.selects.aspectRatio.value);
      // formData.append("colors", colorsSelected);
      // formData.append("themes", themesSelected);
      // formData.append("published", published);
      // formData.append("sytle", formState.selects.style.value);
      // formData.append("uploadedImage", uploadedImage);

      try {
        for (var key of formData.entries()) {
          console.log(key[0] + ', ' + key[1]);
      }
       const resData= await fetch("http://localhost:5000/api/image/new", {
          method: "POST",
          headers:{ 'Content-Type': 'multipart/form-data' },
          body: formData
        });
        console.log("data sent")
        navigate("/image/library");
      } catch (err) {
        console.log(err);
      }