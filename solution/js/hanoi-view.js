(function () {
  var Hanoi = window.Hanoi = (window.Hanoi || {});

  var UI = Hanoi.UI = function UI (game, $el) {
    this.game = game;
    this.$el = $el;

    this.fromTowerIdx = null;
  };

  UI.prototype.clickTower = function (event) {
    var clickedTowerIdx = parseInt($(event.currentTarget).data("tower"));

    if (this.fromTowerIdx == null) {
      this.fromTowerIdx = clickedTowerIdx;
    } else {
      if (!this.game.move(this.fromTowerIdx, clickedTowerIdx)) {
        alert("Invalid Move! Try again.");
      }

      this.fromTowerIdx = null;
    }

    this.render();

    if (this.game.isWon()) {
      // remove click handler
      this.$el.off("click");
      alert("Good work, you!");
    }
  };

  UI.prototype.play = function () {
    this.$el.on(
      "click",
      "div.tower",
      this.clickTower.bind(this)
    );

    this.render();
  };

  UI.prototype.render = function () {
    this.$el.empty();

    for (var towerIdx = 0; towerIdx < 3; towerIdx++) {
      this.$el.append(this.renderTower(towerIdx));
    };
  };

  UI.prototype.renderTower = function (towerIdx) {
    var $towerEl = $("<div>").addClass("tower").data("tower", towerIdx);

    if (this.fromTowerIdx == towerIdx) {
      $towerEl.addClass("selected");
    }

    this.game.towers[towerIdx].forEach(function (diskWidth) {
      var $diskEl = $("<div>").addClass("disk disk-" + diskWidth);
      $towerEl.prepend($diskEl);
    });

    while ($towerEl.children().length < 3) {
      // use a fake disk to force bottom alignment.
      var $fakeDisk = $("<div>").addClass("disk fake");
      $towerEl.prepend($fakeDisk);
    };

    return $towerEl;
  };
})();