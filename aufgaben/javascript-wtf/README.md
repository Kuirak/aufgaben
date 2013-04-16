<small>Web-Entwicklung mit node.js</small><br>
<small>Hochschule Augsburg</small><br>
<small>SS 2013</small>

## Aufgabe 1

Wir möchten ein kleines Spiel programmieren, in dem verschiedene Monster gegeneinander antreten. Jedes Monster startet mit **5 Lebenspunkten** und hat außerdem **4 Attacken**. Eine Attacke besteht aus einem **Angriffswert** und einem **Verteidigungswert**. Die Angriffswerte der 4 Attacken dürfen zusammen **20 Punkte** nicht überschreiten, die Verteidigungswerte **12 Punkte**.

Beispiel:

- Monster: Godzilla
- Attacken:
  - RoundHouseKick:
     - Angriff: 8
     - Verteidigung: 2
  - Punch:
     - Angriff: 5
     - Verteidigung: 4
  - Tackle:
     - Angriff: 2
     - Verteidigung: 5
  - BattleCry:
     - Angriff: 5
     - Verteidigung: 1

Angriffswerte: 8 + 5 + 2 + 5 = 20<br>
Verteidiungswerte: 2 + 4 + 5 + 1 = 12

Jede Attacke darf nur **einmal** angewendet werden, die Reihenfolge der Attacken wird bei Instanziierung festgelegt:

```javascript
var godzilla = new Godzilla(["Punch", "Tackle", "BattleCry", "RoundHouseKick"]);
```

Wir haben einen Referee programmiert, der kontrolliert, dass der Kampf in geordneten Bahnen verläuft. Zu Beginn des Spiels müssen sich beide Monster beim Referee "anmelden":

```javascript
var referee = new Referee();

referee.greetMonsters(kingKong, godzilla);
```

Anschließend überprüft der Referee, dass keines der Monster unfair kämpft:

```javascript
referee.checkForCheaters();
```

Dann beginnt der Kampf:

```javascript
referee.startFight();
```

Der Referee würfelt aus, welches Monster beginnen darf. Danach führt der Referee abwechselnd `monster1.attack(monster2);` und in der nächsten Runde `monster2.attack(monster1);` aus usw.

---

**a)** Erstelle eine Monster-Klasse mit folgenden Methoden:

**Monster(attackOrder: Array<String\>) {**

**.getHealth(): Number**<br>
Gibt die aktuellen Lebenspunkte zurück.

**.growl(): void**<br>
Stößt einen monsterspezifischen Kampfschrei in die Console aus.

**.attack(victim: Monster): void** <br>
Ruft `this.growl()` auf und startet anschließend den Angriff mit `victim.defend(attackPoints)`, wobei `attackPoints` der Angriffswert der aktuellen Attacke ist. Danach wird die nächste, aktive Attacke ausgewählt.

**.defend(attackPoints: Number): void** <br>
Verringert den Angriffswert um den Verteidigungswert der aktuellen Attacke. Bleibt ein positiver Rest übrig, so wird der Rest von den Lebenspunkten abgezogen. Hat das Monster danach weniger als **1 Lebenspunkt**, so stribt es und der Kampf ist entschieden. Das Prozess darf daraufhin einfach mit `process.exit(0);` beendet werden. Bei überstandenem Angriff wird die nächste, aktive Attacke ausgewählt.

**}**

*Hinweis: Ihr dürft und müsst eigene private Attribute verwenden, um z.B. Zustände zu speichern. Wir geben nur das Public Interface vor. Private Attribute sollen mit einem Unterstrich anfangen, wie etwa `_health`*

---

**b)** Leite zwei Monsterklassen davon ab

**Godzilla extends Monster {**

**name: String = "Godzilla"**

**attacks: Object**

**}**

**KingKong extends Monster {**

**name: String = "KingKong"**

**attacks: Object**

**}**

Ihr dürfte gerne auch andere Monster wählen. In diesem Fall müsst ihr allerdings die Namen in unserem Code austauschen.

Beide Subklassen implementieren eine eigene `growl()`-Methode und haben ein `name`-Attribute mit dem jeweiligen Monsternamen (also "KingKong" oder "Godzilla"). Außerdem besitzt jede Subklasse ein eigenes `attacks`-Object, das die jeweiligen Spezialfähigkeiten auflistet. Beispiel:

```javascript
Godzilla.prototype.attacks = {
    RoundHouseKick: {
        attack: 8,
        defense: 2
    }
    //usw.
};
```

Diese Spezialfähigkeiten können dann beim Instanziieren ausgewählt werden, a là:

```javascript
var godzilla = new Godzilla(["Punch", "Tackle", "BattleCry", "RoundHouseKick"]);
```

---

**c)** Lass die Monster gegeneinander antreten. Die Monster sollten mindestens eine Runde gegeneinander bestehen und die Anwendung sollte beim Ausführen keine Fehler werfen.

---

*Bei Fragen und Problemen helfen wir gerne weiter*