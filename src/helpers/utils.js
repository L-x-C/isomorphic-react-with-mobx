import {toJS} from 'mobx';
import {isNumber} from 'lodash';

export function isClient() {
  return !!((typeof window !== 'undefined') && window.document);
}

export function getFetchObj(states) {
  return {
    credentials: 'include',
    headers: {
      Cookie: states.cookie
    }
  };
}

export function generateParticle() {
  require(['particles.js'], function() {
    let el = document.createElement('div');
    el.id = "particles-js";
    document.querySelector('.app-content').appendChild(el);
    window.particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 60,
          "density": {
            "enable": true,
            "value_area": 1000
          }
        },
        "color": {
          "value": ["#d1d1d1"]
        },

        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#fff"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "value": 1,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 1,
            "sync": false
          }
        },
        "size": {
          "value": 4,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#d1d1d1",
          "opacity": 1,
          "width": 1
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "grab"
          },
          "onclick": {
            "enable": false
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });
  });

}

export function removeParticle() {
  let el = document.querySelector('#particles-js');
  el.parentNode.removeChild(el);
}
