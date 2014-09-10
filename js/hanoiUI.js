(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var UI = Hanoi.UI = function UI (game, $el) {
    this.game = game;
    this.$el = $el;

    this.fromTowerIdx = null;
  };

  UI.prototype.clickTower = function (event) {
    var clickedTowerIdx = parseInt($(event.currentTarget).attr("data-tower"));

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
    var ui = this;

    this.$el.empty();

    _.times(3, function (towerIdx) {
      ui.$el.append(ui.renderTower(towerIdx));
    });
  };

  UI.prototype.renderTower = function (towerIdx) {
    var $towerEl = $("<div>").addClass("tower").attr("data-tower", towerIdx);

    if (this.fromTowerIdx == towerIdx) {
      $towerEl.addClass("selected");
    }

    var tower = this.game.towers[towerIdx];
    _(tower).each(function (diskWidth) {
      var disk = $("<div>").addClass("disk").addClass("disk-" + diskWidth);
      $towerEl.prepend(disk);
    });

    _.times(3 - tower.length, function () {
      // use a fake disk to force bottom alignment.
      var fakeDisk = $("<div>").addClass("disk").addClass("fake");
      $towerEl.prepend(fakeDisk);
    });

    return $towerEl;
  };
})(this);
