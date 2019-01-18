//A movable entity will have an image to represent it 
// and an x aand y position
class movableEntity {
    constructor(xposn, yposn, image) {
        this.xposn = xposn;
        this.yposn = yposn;
        this.image = image;
    }
}

//Each bug can have its own speed

class Bug extends movableEntity {
    constructor(xposn, yposn, image, speed) {
        super(xposn, yposn, image);
        this.speed = speed;
        this.imageElem = null;
        this.imageparent = null;
        this.IntId = 0;
    }

    setIntId(Id) {
        this.IntId = Id;
    }


    //Bugs are placed on the differented pavement rows
    //The value for the row number is passed as parameter when the function is called from animate.js
    displayInitial(rowNo) {
        let elem = document.createElement('div');
        let image = document.createElement('img');
        image.setAttribute('src', this.image);
        image.setAttribute('alt', 'bug');
        image.setAttribute("width", "250");
        image.setAttribute("height", "150");
        image.setAttribute("class", "bugclass");
        let xposnStr = `${this.xposn}px`;
        let yposnStr = `${this.yposn}px`;
        image.style.top = yposnStr;
        image.style.left = xposnStr;
        elem.appendChild(image);
        this.imageElem = image;
        this.imageparent = elem;
        let IdStr = '' + (rowNo * 6)

        let ground = document.getElementById(IdStr);
        ground.appendChild(elem);

        //we can have 10 different speeds and the interval of update will be based on the speed
        let interval = 10 / (this.speed);
        //catch the reference to 'this' in myBug and use it to call move
        let myBug = this;
        this.Intid = setInterval(function() {
            myBug.move();
        }, interval);
    }

    move() {
        let image = this.imageElem;
        this.xposn++;
        //After incrementing the position, the bug is repositioned on the screen

        let xposnStr = `${this.xposn}px`;
        image.style.left = xposnStr;

        //if a bug detects a collision with the player, the player is sent back to its starting position
        //The number of failures is also incremented
        if (this.detectCollision(P1)) {
            P1.Reset(4, 2);
            numfailures++;
            let failElem = document.getElementById("failurescount");
            failElem.innerHTML = numfailures;
        }
        // When the bug has crossed the screen width, at some point it must be removed from the system.     
        if (this.xposn > 1500) {
            clearInterval(this.Intid);
            this.imageElem.remove();
            this.imageparent.remove();
        }
    }


    detectCollision(P) {
        let rect = P.imageElem.getBoundingClientRect();
        let rect1 = this.imageElem.getBoundingClientRect();
        let playermid = (rect.top + rect.bottom) / 2;
        let playervertmid = (rect.left + rect.right) / 2;
        if ((playermid <= rect1.bottom) && (playermid >= rect1.top))
            if ((rect.left >= rect1.left) && (rect.left <= (rect1.left + 25))) {
                return true;
            }
        return false;
    }
}



class Player extends movableEntity {

    constructor(xposn, yposn, image) {
        super(xposn, yposn, image);
        this.imageElem = null;
    }

    getImageElem() {
        return this.imageElem;
    }

    createElement() {
        let elem = document.createElement('div');
        let image = document.createElement('img');
        image.setAttribute('src', this.image);
        image.setAttribute('alt', 'player');
        image.setAttribute("width", "250");
        image.setAttribute("height", "150");
        image.setAttribute("class", "playerclass");
        let xposnStr = `${this.xposn}px`;
        let yposnStr = `${this.yposn}px`;
        image.style.top = yposnStr;
        image.style.left = xposnStr;
        elem.appendChild(image);
        this.imageElem = image;
        return elem;
    }

    displayInitial(elem, rowNo, colNo) {
        let IdStr = '' + ((rowNo * 6) + colNo);
        let ground = document.getElementById(IdStr);
        ground.appendChild(elem);
        Ytile = rowNo;
        Xtile = colNo;
        let image = this.imageElem;
        document.onkeydown = this.checkKey; //When the arrow keys are pressed, the player should move
    }


    Reset(rowNo, colNo) {
        let IdStr = '' + ((Ytile * 6) + Xtile);
        let ground = document.getElementById(IdStr);
        let IdStr1 = '' + ((rowNo * 6) + colNo);
        let newground = document.getElementById(IdStr1);
        let elem = ground.firstChild;
        //newground.appendChild(elem);
        this.displayInitial(elem, rowNo, colNo);

    }

    checkKey(e) {
        let IdStr = '' + ((Ytile * 6) + Xtile);
        let ground = document.getElementById(IdStr);

        e = e || window.event;
        if (e.keyCode == '38') {
            if (Ytile > 0)
                Ytile--;
            // up arrow
        } else if (e.keyCode == '40') {
            // down arrow
            if (Ytile < 5)
                Ytile++;
        } else if (e.keyCode == '37') {
            // left arrow
            //The player is not allowed to be moved to column 0 as the bugs originate from that column
            if (Xtile > 1)
                Xtile--;

        } else if (e.keyCode == '39') {
            // right arrow
            if (Xtile < 5)
                Xtile++;
        }

        IdStr = '' + ((Ytile * 6) + Xtile);
        let newground = document.getElementById(IdStr);
        let elem = ground.firstChild;
        newground.appendChild(elem);
        ground = newground;
        let image = P1.getImageElem();
        let rect = image.getBoundingClientRect();

        if (Ytile == 0) { //Player has reached water row
            clearInterval(runTimer);
            let takentime = document.getElementById("playtime");
            let failurecount = document.getElementById("failcount");
            let starrating = document.getElementById("starrating");
            takentime.innerHTML = `Time Taken: ${runTimeMinutes} minutes and ${runTimeSeconds} seconds`;
            failcount.innerHTML = `No. of failures: ${numfailures}`;
            let mymodal = document.getElementById("mymodal");
            mymodal.style.display = "block";
            let span1 = document.getElementsByClassName("replay")[0]; //Choosing Any Button from the modal
            span1.onclick = function() {
                mymodal.style.display = "none";

            } //End of function for onclick

        } //end of if Ytile==0

    } //End of method checkkey

} //End of player class