const welcomeWords = () => {
  const words = [
    {
      word: `Satisfaire vos goûts! Étancher votre faim! <br> Passez vos commandes et faites-les vous livrer à votre convenance.`
    },
    {
      word: `Nos spécialités sont exceptionnelles. <br> Le produit alimentaire le moins cher peut vous remettre sur pied.`
    },
    {
      word: `Notre service est rapide. <br> Le restaurant est maintenu méticuleusement propre, confortable et climatisé.`
    },
    {
      word: `Commandez parmi une large gamme de mets délicats. <br> <em> Spécialités locales, collations, riz, dinde et autres </ em>.`
    }
  ];

  // open on window load (0 sec)
  words.map((v, i, arr) => {
    document.querySelector('.words').innerHTML = arr[Math.floor(Math.random()*arr.length)].word;
  });

  // start after 10 sec 
  words.map((v, i, arr) => {
    setInterval(() => {
      document.querySelector('.words').innerHTML = arr[Math.floor(Math.random()*arr.length)].word;
    }, 10000);
  });

  const bgColor = document.querySelector('.progress-color');   
  let width = 1;
  // repeat every 10 sec
  setInterval(() => {
    if (width >= 100) {
      width = 1;
    } else {
      width++; 
      bgColor.style.width = width + '%'; 
    }
  }, 100);
}

window.onload = () => {
  welcomeWords();
};
