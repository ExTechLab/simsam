// Generated by CoffeeScript 1.3.3
(function() {

  window.html5support = {
    storage: function() {
      var p;
      try {
        p = 'localStorage';
        return p in window && window[p] !== null;
      } catch (error) {
        return false;
      }
    },
    getUserMedia: function() {
      if (navigator.getUserMedia) {
        return true;
      } else {
        return false;
      }
    }
  };

}).call(this);
