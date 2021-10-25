$(document).ready(function () {
  let array = [];
  let sizeofarray;
  let speed;
  let time;

  $("#sortspeed").val(localStorage.getItem("speed"));
  $("#arraysize").val(localStorage.getItem("size"));
  speeed();
  newarray();

  $("#sortspeed").change(speeed);

  function speeed() {
    speed = $("#sortspeed").val();
    localStorage.setItem("speed", $("#sortspeed").val());
    if (speed < 50) {
      speed = Math.floor((1 / speed) * 500);
    } else {
      speed = Math.floor((1 / speed) * 100);
    }
  }

  $("#arraysize").on("input change", newarray);
  $(".newarray").click(newarray);

  function newarray() {
    $(".sorting").empty();
    sizeofarray = $("#arraysize").val();
    localStorage.setItem("size", $("#arraysize").val());
    var width = 85 / sizeofarray;
    for (let i = 0; i < sizeofarray; i++) {
      array[i] = Math.floor(Math.random() * 82) + 5;
      $(".sorting").append('<div class="bar"></div>');
      $(".bar")
        .last()
        .css({
          height: array[i] + "vh",
          width: width + "vw",
        });
    }
  }
  //Useful functions
  //to disable all buttons and inputs
  function disable() {
    $("button").prop("disabled", true);
    $("input").prop("disabled", true);
  }
  //to enable all buttons and inputs
  function enable() {
    setTimeout(() => {
      $("button").prop("disabled", false);
      $("input").prop("disabled", false);
    }, time);
  }
  //to swap two bars
  function swap(index1, height1, color1, index2, height2, color2) {
    setTimeout(() => {
      $(".bar")
        .eq(index1)
        .css({
          height: height1 + "vh",
          backgroundColor: color1,
        });
      $(".bar")
        .eq(index2)
        .css({
          height: height2 + "vh",
          backgroundColor: color2,
        });
    }, (time += speed));
  }
  //to change height of bars
  function changeheight(index, height, color) {
    setTimeout(() => {
      $(".bar")
        .eq(index)
        .css({
          height: height + "vh",
          backgroundColor: color,
        });
    }, (time += speed));
  }
  //to change height of bars instantly(will be used in merge sort)
  function changeheight_instant(index, height, color) {
    setTimeout(() => {
      $(".bar")
        .eq(index)
        .css({
          height: height + "vh",
          backgroundColor: color,
        });
    }, time);
  }
  //to change color of bar
  function changecolor(index, color) {
    setTimeout(() => {
      $(".bar").eq(index).css({
        backgroundColor: color,
      });
    }, (time += speed));
  }
  //to change the color of bars instantly
  function changecolor_instant(index, color) {
    setTimeout(() => {
      $(".bar").eq(index).css({
        backgroundColor: color,
      });
    }, time);
  }
  //to change the background of class
  //notice class is keyword
  function changebgcolor(classs, color) {
    setTimeout(() => {
      $(classs).css({
        backgroundColor: color,
      });
      if (classs != ".bar") {
        $(classs).toggleClass("toggle");
      }
    }, time);
  }
  //Bubble Sort
  $(".bubble").click(function () {
    time = 0;
    disable();
    changebgcolor(".bubble", "#1a83de");
    for (i = 0; i < sizeofarray - 1; i++) {
      var allreadysorted = 0;
      for (let j = 0; j < sizeofarray - 1 - i; j++) {
        changecolor(j, "#ff0627");
        changecolor_instant(j + 1, "gold");
        if (array[j] > array[j + 1]) {
          var temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          swap(j, array[j], "dodgerblue", j + 1, array[j + 1], "#ff0627");
          allreadysorted = 1;
        } else {
          changecolor(j, "dodgerblue");
          changecolor_instant(j + 1, "#ff0627");
        }
      }
      if (allreadysorted == 0) break;
    }
    changebgcolor(".bar", "firebrick");
    changebgcolor(".bubble", "black");
    console.log(time);
    enable();
  });
  //end of bubble
  //selection sort
  $(".selection").click(function () {
    time = 0;
    disable();
    changebgcolor(".selection", "#1a83de");
    for (let l = 0; l < sizeofarray - 1; l++) {
      let min = l;
      for (let m = l + 1; m < sizeofarray; m++) {
        changecolor(min, "#ff0627");
        changecolor_instant(m, "gold");
        if (array[min] > array[m]) {
          changecolor(min, "dodgerblue");
          changecolor_instant(m, "#ff0627");
          min = m;
        } else {
          changecolor(m, "dodgerblue"); //just to show that nothing happen (takes extra time)
        }
      }
      var temp = array[l];
      array[l] = array[min];
      array[min] = temp;
      swap(min, array[min], "dodgerblue", l, array[l], "seagreen"); //only this unit of time is more than bubble sort
    }
    changebgcolor(".bar", "firebrick");
    changebgcolor(".selection", "black");
    console.log(time);
    enable();
  });
  //end of selection sort
  //insertion sort

  $(".insertion").click(() => {
    time = 0;
    disable();
    changebgcolor(".insertion", "#1a83de");
    for (let z = 1; z < sizeofarray; z++) {
      changecolor(z, "#ff0627");
      changecolor_instant(z - 1, "gold");
      var x;
      for (x = z; x > 0 && array[x] < array[x - 1]; x--) {
        var temp = array[x];
        array[x] = array[x - 1];
        array[x - 1] = temp;
        swap(x, array[x], "seagreen", x - 1, array[x - 1], "#ff0627");
        if (x - 2 >= 0) {
          changecolor(x - 2, "gold");
        }
      }
      changecolor(x, "seagreen");
      if (x > 0) {
        changecolor_instant(x - 1, "seagreen");
      }
    }
    changebgcolor(".bar", "firebrick");
    changebgcolor(".insertion", "black");
    console.log(time);
    enable();
  });
  //merge sort
  $(".merge").click(() => {
    time = 0;
    disable();
    changebgcolor(".merge", "#1a83de");
    let arraycopy = [];
    for (var e = 0; e < sizeofarray; e++) {
      arraycopy[e] = array[e];
    }
    mergesort(0, sizeofarray - 1);

    function mergesort(start, end) {
      if (start < end) {
        let mid = Math.floor((end + start) / 2);
        mergesort(start, mid);
        mergesort(mid + 1, end);
        merge(start, mid, end);
      }
    }

    function merge(start, mid, end) {
      var p = start,
        q = mid + 1;

      var k = start;

      for (var o = start; o <= end; o++) {
        if (p > mid) {
          array[k++] = arraycopy[q++];
          changeheight_instant(k - 1, array[k - 1], "seagreen");
        } else if (q > end) {
          array[k++] = arraycopy[p++];
          changeheight_instant(k - 1, array[k - 1], "seagreen");
        } else if (arraycopy[p] < arraycopy[q]) {
          changecolor(q, "#ff0627");
          changecolor_instant(k, "gold");
          array[k++] = arraycopy[p++];
          changeheight(k - 1, array[k - 1], "seagreen");
        } else {
          let tempi = array[k];
          changecolor(q, "#ff0627");
          changecolor_instant(k, "gold");
          array[k++] = arraycopy[q++];
          changeheight(k - 1, array[k - 1], "seagreen");
          for (let g = q - 1; g > k; g--) {
            changeheight_instant(g, array[g - 1], "seagreen");
            array[g] = array[g - 1];
          }
          changeheight_instant(k, tempi, "seagreen");
        }
      }

      for (var t = start; t <= end; t++) {
        arraycopy[t] = array[t];
      }
    }
    changebgcolor(".bar", "firebrick");
    changebgcolor(".merge", "black");
    console.log(time);
    enable();
  });
  //end of merge sort
  //quick sort
  $(".quick").click(() => {
    time = 0;
    disable();
    changebgcolor(".quick", "#1a83de");
    quicksort(0, sizeofarray - 1);

    function quicksort(start, end) {
      if (start < end) {
        let pindex = partition(start, end);
        quicksort(start, pindex - 1);
        quicksort(pindex + 1, end);
      }
    }

    function partition(start, end) {
      let pivot = array[end];
      changecolor(end, "#ff0627");
      let c;
      let pindex = start;
      for (var e = start; e <= end - 1; e++) {
        changecolor_instant(e, "gold");
        if (array[e] <= pivot) {
          c = array[pindex];
          array[pindex] = array[e];
          array[e] = c;
          swap(pindex, array[pindex], "blue", e, array[e], "dodgerblue");
          pindex++;
        } else {
          changecolor(e, "dodgerblue");
        }
      }
      c = array[pindex];
      array[pindex] = pivot;
      array[end] = c;
      changecolor(pindex, "#af06ff");
      swap(pindex, array[pindex], "#ff0627", end, array[end], "#af06ff");
      changebgcolor(".bar", "dodgerblue");
      return pindex;
    }
    changebgcolor(".bar", "firebrick");
    changebgcolor(".quick", "black");
    console.log(time);
    enable();
  });

  //start of heap sort
  $(".heap").click(() => {
    time = 0;
    disable();
    changebgcolor(".heap", "#1a83de");
    // testing
    heapsort();

    function heapsort() {
      //insertion (making max heap)

      for (var b = Math.floor(sizeofarray / 2) - 1; b >= 0; b--) heapify(b);

      //deletion
      for (var w = 0; w < sizeofarray; w++) {
        deletion(sizeofarray - 1 - w);
      }
    }

    function heapify(z) {
      // Find largest among root, left child and right child
      var largest = z;
      var left = 2 * z + 1;
      var right = 2 * z + 2;
      if ($(".bar").eq(largest).css.backgroundColor !== "#ff0627")
        changecolor(largest, "#ff0627");
      if (left < sizeofarray && array[left] > array[largest]) {
        changecolor_instant(left, "gold");
        largest = left;
      }

      if (right < sizeofarray && array[right] > array[largest]) {
        changecolor_instant(right, "gold");
        largest = right;
      }

      // Swap and continue heapifying if root is not largest
      if (largest != z) {
        var temp = array[z];
        array[z] = array[largest];
        array[largest] = temp;
        swap(z, array[z], "dodgerblue", largest, array[largest], "#ff0627");
        if (left < sizeofarray && largest != left)
          changecolor_instant(left, "dodgerblue");
        if (right < sizeofarray && largest != right)
          changecolor_instant(right, "dodgerblue");
        heapify(largest);
      } else {
        changecolor_instant(largest, "dodgerblue");
        if (left < sizeofarray) changecolor_instant(left, "dodgerblue");
        if (right < sizeofarray) changecolor_instant(right, "dodgerblue");
      }
    }

    function deletion(last) {
      var temp = array[0];
      array[0] = array[last];
      array[last] = temp;
      swap(0, array[0], "#ff0627", last, array[last], "seagreen");

      for (var z = 0; z < sizeofarray; ) {
        var largest = z;
        var left = 2 * z + 1;
        var right = 2 * z + 2;

        if ($(".bar").eq(z).css.backgroundColor !== "#ff0627")
          changecolor(largest, "#ff0627");

        if (left < last && array[left] > array[largest]) {
          largest = left;
          changecolor_instant(left, "gold");
        }

        if (right < last && array[right] > array[largest]) {
          largest = right;
          changecolor_instant(right, "gold");
        }

        // Swap and continue heapifying if root is not largest
        if (largest != z) {
          var temp = array[z];
          array[z] = array[largest];
          array[largest] = temp;
          swap(z, array[z], "dodgerblue", largest, array[largest], "#ff0627");
          if (left < last && largest != left)
            changecolor_instant(left, "dodgerblue");
          if (right < last && largest != right)
            changecolor_instant(right, "dodgerblue");
          z = largest;
        } else {
          changecolor_instant(largest, "dodgerblue");
          if (left < last) changecolor_instant(left, "dodgerblue");
          if (right < last) changecolor_instant(right, "dodgerblue");
          break;
        }
      }
    }

    changebgcolor(".bar", "firebrick");
    changebgcolor(".heap", "black");
    console.log(time);
    enable();
  });
  //end of merge sort
});
