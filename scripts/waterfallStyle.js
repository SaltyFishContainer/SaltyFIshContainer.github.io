(function() {
    var pics = [];
    var z = 0;

    function GetMinHeightOfFour(arr) {
        let i1 = arr[0] <= arr[1] ? 0 : 1,
            i2 = arr[2] <= arr[3] ? 2 : 3;
        return arr[i1] <= arr[i2] ? i1 : i2;
    }

    function GetIndexOf(ele, arr) {
        for (let i = 0; i < arr.length; ++i)
            if (ele === arr[i]) return i;
    }

    function LoadPictures() {
        let content = document.getElementsByClassName("Content").item(0);
        for (let i = 0; i < 27; ++i) {
            let ele = document.createElement("IMG");
            ele.src = "pictures/photo_" + i + ".jpg";
            ele.className = "Item";
            ele.style.zIndex = 0;
            ele.addEventListener("click", OpenPic);
            content.appendChild(ele);
            pics.push(ele);
            // console.log(ele.offsetWidth);
            // always 0
        }
        //Delay a few time, then it works maybe I can not get offsetHeight when loading
        setTimeout(
            function() {
                let vh = document.documentElement.clientHeight / 100;
                let hei = document.getElementById("text").offsetHeight + 10 * vh;
                //console.log(vh);
                let wid = pics[0].offsetWidth;
                let heights = [hei, hei, hei, hei];
                let rows = [];
                //console.log(heights);
                for (let i = 0; i < pics.length; ++i) {
                    //console.log(pics[i].offsetHeight);
                    if (i < 4) {
                        rows[i] = pics[i];
                        heights[i] += pics[i].offsetHeight;
                    } else {
                        let minIndex = GetMinHeightOfFour(heights);
                        //console.log(minIndex);
                        pics[i].style.position = "absolute"
                        pics[i].style.top = heights[minIndex] + "px"
                        pics[i].style.left = minIndex * wid + (minIndex * 2) * vh + "px";
                        heights[minIndex] += pics[i].offsetHeight + 2 * vh;
                        rows[minIndex] = pics[i];

                    }

                }
                //console.log(heights);

            }, 50)
    }

    function OpenPic() {
        if (this.style.zIndex == 0) {
            this.style.zIndex = ++z;
            this.style.transform = "scale(2)";
        } else {
            this.className = "Item";
            this.style.zIndex = 0;
            --z;
            this.style.transform = "scale(1)";
        }
    }

    window.addEventListener("load", LoadPictures);
})()