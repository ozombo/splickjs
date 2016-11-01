var DOM = function (selector) {
  if (typeof selector == "string") {
        selector = document.querySelectorAll(selector);
  }
  this.animate = function (prop, times, callbacks) {
      var el = selector;
      var animate = function (element, props, time, callback) {
          callback = callback || function () {};
          time = time || 1000;
          var timers = {}, // store the different interval timers so that they can be cancelled
          calls = 0, // numbers of times the call would have been called
          nprops = 0; // number of properties
          for (var prop in props) {
              (function (prop) {
                  var edit = prop == "scrollTop" ? element : element.style;
                  var stepCounter = [],
                      customStep = props[prop],
                      curr = edit[prop],
                      lastStepPercent = curr == "" ? (prop == "opacity" ? 1 : 0) : curr,
                      measure = prop == "scrollTop" || prop == "opacity" ? "" : "px",
                      stepper = function () {
                          edit[prop] = stepCounter[0] + measure;
                          stepCounter.shift();
                      };
                  if (props[prop].constructor == Number) customStep = [props[prop]];
                  for (var step = 0, len = customStep.length; step < len; step++) {
                      var from = parseInt(lastStepPercent),
                          to = parseInt(customStep[step]),
                          small = to < from,
                          numOfSteps = small ? from - to : to - from, // get current number of frames
                          multi = 30 * Math.round(parseInt(time) / 1000),
                          by = numOfSteps / (25 + multi) * len; // the stepper number

                      if (from == to) {
                          break;
                      }
                      for (var i = from; small ? i >= to : i <= to; i += small ? -by : by) {
                          stepCounter.push(i);
                      }
                      stepCounter.push(to);
                      lastStepPercent = customStep[step];
                  }
                  stepper();
                  timers[element + prop] = setInterval(function () {
                      stepper();
                      if (stepCounter.length == 0) {
                          clearInterval(timers[element + prop]);

                          calls++;
                          if (calls == nprops) {
                              callback.call(element);
                          }
                      }
                  }, time / stepCounter.length);
                  nprops++;
              })(prop);
          }
      };
      for (var i = 0; i < el.length; i++) {
          animate(el[i], prop, times, callbacks);
      };
      return new DOM(selector); // re-initiate "JavaScript class" for chaining
  }
  this.click = function (fun) {
      var el = selector;
      for (var i = 0, len = el.length; i < len; i++) {
        el[i].onclick = fun.bind(el);
      }
  }
};