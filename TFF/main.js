var TextToHighlight

//https://www.youtube.com/watch?v=LYfQY836E2w
//"this page name".html?page=contact_us
window.onload = function() {
    function ParseURLParameter(Parameter) {
        // Usage var TextToHighlight = ParseURLParameter('TextToHighlight');
        var FullURL = window.location.search.substring(1);
        var ParametersArray = FullURL.split('&');

        for (var i = 0; i < ParametersArray.length; i++) {
            var CurrentParameter = ParametersArray[i].split('=');
            if (CurrentParameter[0] == Parameter) {
                return CurrentParameter[1];
            }
        }
    }
    TextToHighlight = ParseURLParameter('TextToHighlight');
    TextToHighlight = " " + TextToHighlight + " "
    if (typeof TextToHighlight !== 'undefined') {
        console.log(TextToHighlight); // just to verify that TextToHighlight is storing the value we want (for our URL action)
    }


    var containerQS = '.article';
    var container = document.querySelector(containerQS);

    var markClass = 'mark';
    var markerHeight = '2px';
    var _color = 'currentColor';

    var containerY = container.offsetTop;
    var containerH = container.scrollHeight;

    var customStyle = document.createElement('style');
    container.appendChild(customStyle);


    //necessary functions for mark options
    var renderScrollMarker = function renderScrollMarker($parent, posArr) {
        var _posArr = posArr.map(function(i) {
            return 'transparent ' + i + ', ' + _color + ' ' + i + ', ' + _color + ' calc(' + i + ' + ' + markerHeight + '), transparent calc(' + i + ' + ' + markerHeight + ')';
        });

        customStyle.innerHTML = 'article::-webkit-scrollbar-track {\n        background-image: linear-gradient(' + _posArr.join() + ');\n      }';

    };


    var calcEleRelativePos = function calcEleRelativePos($ele) {
        return ($ele.offsetTop - containerY) / containerH;
    };

    //
    var markOptions = {
        className: markClass,
        done: function done() {
            var marks = document.querySelectorAll('.' + markClass);
            var allY = [].map.call(marks, function(mark) {
                return (calcEleRelativePos(mark) * 100).toFixed(2) + '%';
            });
            renderScrollMarker(container, allY);
            console.log(allY);
        }
    };


    var instance = new Mark(container);

    instance.mark(TextToHighlight, markOptions);





};