module.exports = {
  drink: {
    // title %1
    ls1: [
      'قهوه',
      'شاي',
      'عصيربرتقال',
      'عصيرليمون',
      'عصير',
      'ببسي',
      'كوكوكولا',
      'عصيررمان',
      'مته'
    ],
    // emoji %2
    ls2: [
      '☕️',
      '\uD83C\uDF75',
      '\uD83C\uDF4A',
      '\uD83C\uDF4B',
      '🍹',
      '🥤',
      '🥤',
      '🥤',
      '🧋'
    ],
    // replay name %3
    ls3: [
      'قهوه',
      'شاي',
      'البرتقال',
      'اليمون',
      'عصير',
      'ببسي',
      'كوكولا',
      'رمان',
      'مته'
    ],
    // replay txt
    ls4: [
      'حاضر',
      'امرك يا معلم ',
      ' كاس ' + '%3' + ' للمعلم ',
      'ليكها جاهزة',
      'أبشر',
      ' وصل كاس ال' + '%3'
    ]
  },

  eat: {
    // title %1
    ls1: ['طعميه', 'تاكو', 'شاورما', 'برجر', 'بيتزا', 'شبس', 'سامبوسه'],
    // emoji %2
    ls2: ['🥙', '🌮', '🌯', '🍔', '🍕', '🍟', '🥟'],
    // replay name %3
    ls3: ['طعمية', 'تاكو', 'شاورما', 'برجر', 'بيتزا', 'شبس', 'سامبوسة'],
    // replay txt
    ls4: [
      'حاضر',
      'امرك يا معلم ',
      ' احلا صحن ' + ' %3 ' + ' للمعلم ',
      'ليكها جاهزة',
      'أبشر',
      ' وصل صحن ال' + '%3'
    ]
  },

  word: {
    from: ['شوعندكمشروبات', 'شوعندكاكلات', 'قائمهعبود'],
    to: [
      'المشروبات الموجوده هي \n\n' +
        'قهوه \n' +
        'شاي \n' +
        'البرتقال \n' +
        'اليمون \n' +
        'عصير \n' +
        'ببسي \n' +
        'كوكولا \n' +
        'رمان \n' +
        'مته \n' +
        '\n ارسل عبود ثم اسم احد المشروبات السابقة ليعمل البوت',
      /// /////////////////////////////////////
      'الماكولات الموجوده هي \n\n' +
        'طعميه \n' +
        'تاكو \n' +
        'شاورما \n' +
        'برجر \n' +
        'بيتزا \n' +
        'شبس \n' +
        '\n سامبوسة' +
        '\n ارسل عبود ثم اسم احد الماكولات السابقة ليعمل البوت',
      /// ////////////////////////////////
      'المشروبات الموجوده هي \n\n' +
        'قهوه \n' +
        'شاي \n' +
        'البرتقال \n' +
        'اليمون \n' +
        'عصير \n' +
        'ببسي \n' +
        'كوكولا \n' +
        'رمان \n' +
        'مته \n' +
        '\n' +
        'الماكولات الموجوده هي \n\n' +
        'طعميه \n' +
        'تاكو \n' +
        'شاورما \n' +
        'برجر \n' +
        'بيتزا \n' +
        'شبس \n' +
        '\n سامبوسة' +
        '\n ارسل عبود ثم اسم احد الماكولات او المشروبات السابقة ليعمل البوت'
    ]
  }
}
