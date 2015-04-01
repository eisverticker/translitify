# translitify
Javascript transliteration of Latin letters to the Cyrillic ones or to something else. Applicable to any textarea and input (text).

#German/Deutsch
Dieses Modul ermöglicht es, ein Textfeld so umzuwandeln, 
dass es Wörter erzeugen kann, welche nicht aus den Buchstaben des Alphabetes der Tastatur zusammengesetzt sind.
Dabei werden zum Beispiel lateinische Buchstabenkombination wie "privet" in russische Buchstaben transliteriert (привет).

Anwendung:

1.) Lade dir den translitify-Ordner/Archiv herunter oder klone das Archiv.

2.) Binde die Javascript-Datei translitify.js in deine HTML-Seite ein
```
<script src="translitify.js"></script>
```

3.) Binde weiterhin die Buchstabenprofile, welche du nutzen möchtest ein
<script src="profiles/latin/cyrillic.js"></script>

3.) Wandle dein Texteingabefeld um:
```
var textfeld = document.getElementById('eingabefeld');
translitify(textfeld, translitify_latin_cyrillic);
```

Nun sollte die Transliteration funktionieren.

Transliteration deaktivieren:
```
textfeld.isTranslitified = false;
```

Auf das Translitify-Objekt zugreifen:
```
textfeld.translitifier;
```

Buchstabenprofil ändern:
```
textfeld.translitifier.setProfile(translitify_latin_greek);
```

#English
This tool transliterates the letters you type into a specific textfield just in time.

Usage:

1.) Download or clone the translitify-folder and copy it to your project location.

2.) Include translitify.js into your webpage
```
<script src="translitify.js"></script>
```

3.) Furthermore include the profiles you want to use (e.g. latin to cyrillic)
```
<script src="profiles/latin/cyrillic.js"></script>
```

3.) Convert your textfield like this:
```
var input = document.getElementById('textinput');
translitify(input, translitify_latin_cyrillic);
```

Now it should work, try it out!

Deactivate transliteration:
```
input.isTranslitified = false;
```

Access the translitify-object:
```
input.translitifier;
```

Change the profile:
```
input.translitifier.setProfile(translitify_latin_greek);
```

Good luck!
