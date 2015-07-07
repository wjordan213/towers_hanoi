(function () {
  if (typeof TTT === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  };

  var $discOne = $("<section>").addClass("disc one");
  var $discTwo = $("<section>").addClass("disc two");
  var $discThree = $("<section>").addClass("disc three");
  var discs = [$discOne, $discTwo, $discThree];

  var fromPile = 0;

  View.prototype.render = function () {
  $(".disc").remove();

    var towers = this.game.towers;

    for (var pile = 0; pile < towers.length; pile++) {
      for (var disc = 0; disc < towers[pile].length; disc++) {
        var discId = towers[pile][disc];
        discs[discId - 1].appendTo("#" + (pile + 1));
      }
    }
  };

  View.prototype.bindEvents = function () {
    this.$el.on("click", ".pile", function(event) {
      if (Hanoi.denied) {
        Hanoi.denied = false;
        $('.nope').remove();
      }
      this.makeMove($(event.currentTarget));
    }.bind(this));
  };

  View.prototype.makeMove = function ($pile) {
    if (fromPile === 0) {
      fromPile = $pile.attr("id") ;
      $pile.toggleClass('clicked');
    }
    else {
      var result = this.game.move(fromPile - 1, $pile.attr("id") - 1);
      if (result) {
        this.render();
        this.handleWin();
      } else {
        $('.main').prepend('<p class="nope">Not allowed</p>');
        Hanoi.denied = true;
      }

      $('li[id="' + fromPile +'"]').toggleClass('clicked');
      this.game.print();
      fromPile = 0;
    }
  };

  View.prototype.handleWin = function () {
    if (this.game.isWon()) {
      $('.main').append($('<div class="message"><p>You Won!</p><br><button class="newGame">New Game</button></div>'));
      $('button.newGame').on('click', function(event) {
        event.preventDefault();
        $('button').off();
        $('div.message').remove();
        this.game = new Games.Game();
        this.render();
      }.bind(this));
    }
  };

  View.prototype.setupBoard = function () {
    this.$el.append("<ul>");
    var $ul = this.$el.find("ul");
    $ul.addClass("view");

    for (var i = 1; i < 4; i++) {
      $("<li>").addClass("pile").attr("id", i).appendTo(".view");
    }

    this.game.print();
    this.render();
  };
})();
