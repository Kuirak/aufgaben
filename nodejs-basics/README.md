<small>Web-Entwicklung mit node.js</small><br>
<small>Hochschule Augsburg</small><br>
<small>SS 2013</small>

## Aufgabe 2

Nun, da die Monster ihre ersten Kämpfe austragen, möchten wir das ganze etwas modularisieren.

---

**a)** Teile die monsters.js in 2 verschiedene Module auf:

- **monsters**: Beinhaltet die Monster- und die Referee-Klasse. Dieses Modul ist unsere Library, die wir (theoretisch) auch in anderen Monster-Projekten einsetzen könnten.

- **monsterFight**: Dieses Modul ist unsere konkrete Anwendung, die spezifischere Implementierungen der Monster-Klasse beinhaltet, also die Godzilla- und die KingKong-Klasse. Außerdem befindet sich hier auch der ausführbare Code. Wir wollen deshalb bei diesem Modul von unserer App sprechen.

Außerdem sollte jede Klasse immer ihre eigene Datei haben. Die Ordnerstruktur sieht also am Ende folgendermaßen aus:

![Structure](https://github.com/hsa-nodejs-workshop/aufgaben/raw/master/aufgabe-2/structure.png)

- **/monsters.js** ist die Datei, die ihr mit `node monsters.js` ausführen könnt.

- **/package.json** definiert das monsterFight-Modul

- **/lib/Godzilla.js**<br>**/lib/KingKong.js**<br>**/node\_modules/monsters/lib/Monster.js**<br>**/node_modules/monsters/lib/Referee.js** beinhalten die jeweiligen Klassen

- **/node_modules/monsters/package.json** definiert das monsters-Modul. Als Einstiegspunkt ist die **lib/index.js** angegeben, die jeweils wiederum einfach die Monster- und die Referee-Klasse exportiert.

Ziel ist es, dass ich das monsters-Modul folgendermaßen in der monsterFight-App anwenden kann:

```javascript
var monsters = require("monsters"),
    Monster = monsters.Monster,
    Referee = monsters.Referee;
```

Führt nun die **/monsters.js** aus und schaut, ob noch alles funktioniert ;)

---

**b)** Nun müssen die Kompetenzen zwischen den Modulen klarer verteilt werden. Ein Problem ist zum Beispiel, dass die Monster-Klasse selber `process.exit()` ausführt. Die Monster-Klasse sollte aber nicht entscheiden, ob der Prozess beendet wird oder nicht - sie stellt ja lediglich das Monster in der Anwendung dar. Auch beinhaltet die jeweilige Monster-Klasse vermutlich (je nachdem, wie ihr es implementiert habt) ein paar `console.log()`s, die über den aktuellen Zustand informieren.

Die Klassen sollen in Zukunft nur noch die eigentliche Applikations-Logik ausführen, aber nicht darüber entscheiden, in welcher Form der Zustand an den Benutzer ausgegeben wird (also kein `console.log()`). Deshalb möchten wir jetzt den EventEmitter von node verwenden. Die Monster-Klasse soll von diesem aberben, so dass wir in der Monster-Klasse Events feuern können, die über den aktuellen Zustand des Monsters informieren. Folgende Events gibt es:

- **attack**, wenn das Monster ein anderes Monster angreift. Der Event liefert außerdem den Namen des Monsters mit.
- **hit**, wenn das Monster verwundet wurde. Die Listener bekommen außerdem den Schaden, den das Monster erlitten hat.
- **defend**, wenn das Monster einen Angriff erfolgreich ohne Schaden überstanden hat
- **die**, wenn das Monster weniger als ein Leben hat.

Nun könnt ihr innerhalb der **/monsters.js** an beide Monster Event-Listener hinzufügen, die über `console.log` den aktuellen Zustand des Monsters in der Konsole ausgeben. Beim **die-Event** soll außerdem der Prozess mit `process.exit()` beendet werden.

Hier noch ein kleiner Tipp: Innerhalb der Event-Listener zeigt `this` auf das Monster, das den Event gefeuert hat. Ihr könnt also den Namen des Monsters folgendermaßen ausgeben:

```javascript
function onHit(damage) {
    console.log("%s got hit with %s (remaining %s health)", this.name, damage, this.getHealth());
}
```

Mit `%s` könnt ihr komfortabel Strings in die Konsolenausgabe einbauen. `console.log("%s says '%s', name, msg)` ist nichts anderes als `console.log(name + " says '" + msg + "'")`

---

**c)** Macht die Konsolenausgabe bunt mit dem npm-Modul [ansicolors](https://github.com/thlorenz/ansicolors). Dazu soll das ansicolors-Modul in die package.json des monsterFight-Moduls als Dependency angegeben werden, damit wir beim Testen eurer App nur noch `npm install` ausführen müssen.

Die Implementierung mit ansicolors sieht dann so aus:

```javascript
function onHit(damage) {
    console.log(colors.cyan("%s got hit with %s (remaining %s health)"), this.name, damage, this.getHealth());
}
```

---

*Bei Fragen und Problemen helfen wir gerne weiter*