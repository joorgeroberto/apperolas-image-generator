import React, { useEffect, useRef } from 'react';

const wrapText = function(ctx, text, author, x, y, maxWidth, lineHeight) {
  // First, start by splitting all of our text into words, but splitting it into an array split by spaces
  let words = text.split(' ');
  let line = ''; // This will store the text of the current line
  let testLine = ''; // This will store the text when we add a word, to test if it's too long
  let textArray = []; // This is an array of lines, which the function will return
  let authorArray = [];
  // Lets iterate over each word
  for(var n = 0; n < words.length; n++) {
      // Create a test line, and measure it..
      testLine += `${words[n]} `;
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      // If the width of this test line is more than the max width
      if (testWidth > maxWidth && n > 0) {
          // Then the line is finished, push the current line into "lineArray"
          textArray.push([line, x, y]);
          // Increase the line height, so a new line is started
          y += lineHeight;
          // Update line and test line to use this word as the first word on the next line
          line = `${words[n]} `;
          testLine = `${words[n]} `;
      }
      else {
          // If the test line is still less than the max width, then add the word to the current line
          line += `${words[n]} `;
      }
      // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
      if(n === words.length - 1) {
        textArray.push([line, x, y]);
      }
  }
  authorArray.push([`- ${author}`, x, y + 2 * lineHeight]);
  // Return the line array
  return {textArray, authorArray};
}

export function Canvas({width, height, author, imageToShow, textToShow}) {
  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')
    const img = imageRef.current;

    let grd = ctx.createLinearGradient(0, height, width, 0);
    grd.addColorStop(0, '#000000');
    grd.addColorStop(1, '#000000');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, width, height);

    img.onload = () => {
      ctx.filter = "grayscale()";
      ctx.drawImage(img, 0, 0, height - 50, height);
        ctx.fill();
    }
    ctx.font = '40px Courier';
    ctx.fillStyle = 'white';
    let wrappedText = wrapText(ctx, textToShow, author, (width / 2) + 50, (height / 2.5), (width / 2) - 50, 50);
    console.log(wrappedText)
    wrappedText.textArray.forEach(function(item) {
        // item[0] is the text
        // item[1] is the x coordinate to fill the text at
        // item[2] is the y coordinate to fill the text at
        ctx.fillText(item[0], item[1], item[2]); 
    })
    wrappedText.authorArray.forEach(function(item) {
      // item[0] is the text
      // item[1] is the x coordinate to fill the text at
      // item[2] is the y coordinate to fill the text at
      ctx.fillText(item[0], item[1], item[2]); 
    })
  }, [textToShow, width, height, author]);

  return (
    <>
      <div>
        <img alt='Original_Image' width={0} height={0} ref={imageRef} src={imageToShow} />
      </div>
      <div>
        <canvas 
          alt='Canvas_Image' 
          ref={canvasRef} 
          width={width} 
          height={height} 
        />
      </div>
    </>
  )
}