import { InvoiceData, BillToInfo, AdvancedConfig } from '@/types/invoice';

// 随机生成Invoice号码 (格式: 8位字符-4位数字)
function generateInvoiceNumber(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const numbers = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${result}-${numbers}`;
}

// 随机生成收据号码 (格式: 4位数字-4位数字)
function generateReceiptNumber(): string {
  const part1 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const part2 = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${part1}-${part2}`;
}

// 随机生成支付方式
function generatePaymentMethod(): string {
  const methods = [
    'American Express - 1116',
    'Visa - 4532',
    'MasterCard - 5678',
    'American Express - 3456',
    'Visa - 4123',
    'MasterCard - 5432',
    'Discover - 6011',
    'American Express - 3789',
    'Visa - 4987',
    'MasterCard - 5123'
  ];
  return methods[Math.floor(Math.random() * methods.length)];
}

// 随机生成日期 (2025年4月17日至2025年6月16日)
function generateRandomDate(): string {
  const startDate = new Date('2025-04-17');
  const endDate = new Date('2025-06-16');
  const timeDiff = endDate.getTime() - startDate.getTime();
  const randomTime = Math.random() * timeDiff;
  const randomDate = new Date(startDate.getTime() + randomTime);
  
  return randomDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// 中国地址数据 - 覆盖全国主要城市
const chinaAddressData = [
  // 北京市
  {
    name: '张伟',
    address1: '朝阳区建国门外大街1号',
    address2: '国贸大厦A座',
    city: '北京市',
    state: '北京市',
    country: 'China'
  },
  {
    name: '周杰',
    address1: '海淀区中关村大街27号',
    address2: '中关村大厦',
    city: '北京市',
    state: '北京市',
    country: 'China'
  },
  {
    name: '马云',
    address1: '西城区金融大街35号',
    address2: '国际企业大厦',
    city: '北京市',
    state: '北京市',
    country: 'China'
  },

  // 上海市
  {
    name: '王芳',
    address1: '浦东新区陆家嘴环路1000号',
    address2: '恒生银行大厦',
    city: '上海市',
    state: '上海市',
    country: 'China'
  },
  {
    name: '孙丽',
    address1: '黄浦区南京东路558号',
    address2: '上海旅游大厦',
    city: '上海市',
    state: '上海市',
    country: 'China'
  },
  {
    name: '吴磊',
    address1: '徐汇区漕溪北路88号',
    address2: '圣爱大厦',
    city: '上海市',
    state: '上海市',
    country: 'China'
  },

  // 广东省
  {
    name: '李明',
    address1: '天河区珠江新城花城大道85号',
    address2: '太古汇商场',
    city: '广州市',
    state: '广东省',
    country: 'China'
  },
  {
    name: '陈静',
    address1: '南山区深南大道9988号',
    address2: '华润大厦北座',
    city: '深圳市',
    state: '广东省',
    country: 'China'
  },
  {
    name: '黄晓明',
    address1: '福田区益田路6009号',
    address2: '新世界中心',
    city: '深圳市',
    state: '广东省',
    country: 'China'
  },
  {
    name: '林志玲',
    address1: '越秀区中山五路68号',
    address2: '五羊新城广场',
    city: '广州市',
    state: '广东省',
    country: 'China'
  },

  // 浙江省
  {
    name: '刘强',
    address1: '西湖区文三路259号',
    address2: '昌地火炬大厦',
    city: '杭州市',
    state: '浙江省',
    country: 'China'
  },
  {
    name: '赵敏',
    address1: '江干区钱江路1366号',
    address2: '华润大厦A座',
    city: '杭州市',
    state: '浙江省',
    country: 'China'
  },
  {
    name: '马化腾',
    address1: '滨江区网商路699号',
    address2: '阿里巴巴滨江园区',
    city: '杭州市',
    state: '浙江省',
    country: 'China'
  },

  // 江苏省
  {
    name: '王健林',
    address1: '玄武区中山路18号',
    address2: '德基广场',
    city: '南京市',
    state: '江苏省',
    country: 'China'
  },
  {
    name: '刘亦菲',
    address1: '工业园区苏州大道西9号',
    address2: '苏州国际财富广场',
    city: '苏州市',
    state: '江苏省',
    country: 'China'
  },
  {
    name: '范冰冰',
    address1: '梁溪区中山路343号',
    address2: '无锡茂业天地',
    city: '无锡市',
    state: '江苏省',
    country: 'China'
  },

  // 四川省
  {
    name: '邓超',
    address1: '锦江区红星路三段1号',
    address2: '成都国际金融中心',
    city: '成都市',
    state: '四川省',
    country: 'China'
  },
  {
    name: '赵丽颖',
    address1: '武侯区人民南路四段3号',
    address2: '来福士广场',
    city: '成都市',
    state: '四川省',
    country: 'China'
  },

  // 湖北省
  {
    name: '李娜',
    address1: '江汉区建设大道568号',
    address2: '新世界国贸大厦',
    city: '武汉市',
    state: '湖北省',
    country: 'China'
  },
  {
    name: '姚明',
    address1: '洪山区珞喻路129号',
    address2: '华中科技大学科技园',
    city: '武汉市',
    state: '湖北省',
    country: 'China'
  },

  // 陕西省
  {
    name: '张艺谋',
    address1: '雁塔区高新路88号',
    address2: '尚品国际',
    city: '西安市',
    state: '陕西省',
    country: 'China'
  },
  {
    name: '白百何',
    address1: '碑林区南大街1号',
    address2: '世纪金花购物中心',
    city: '西安市',
    state: '陕西省',
    country: 'China'
  },

  // 山东省
  {
    name: '黄渤',
    address1: '市南区香港中路61号',
    address2: '远洋大厦',
    city: '青岛市',
    state: '山东省',
    country: 'China'
  },
  {
    name: '范明',
    address1: '历下区泉城路180号',
    address2: '齐鲁国际大厦',
    city: '济南市',
    state: '山东省',
    country: 'China'
  },

  // 福建省
  {
    name: '林更新',
    address1: '思明区鹭江道8号',
    address2: '厦门国际银行大厦',
    city: '厦门市',
    state: '福建省',
    country: 'China'
  },
  {
    name: '蔡依林',
    address1: '鼓楼区五四路158号',
    address2: '世欧广场',
    city: '福州市',
    state: '福建省',
    country: 'China'
  },

  // 辽宁省
  {
    name: '宋小宝',
    address1: '和平区青年大街288号',
    address2: '华润中心',
    city: '沈阳市',
    state: '辽宁省',
    country: 'China'
  },
  {
    name: '孙红雷',
    address1: '中山区人民路15号',
    address2: '大连国际金融中心',
    city: '大连市',
    state: '辽宁省',
    country: 'China'
  },

  // 河南省
  {
    name: '岳云鹏',
    address1: '金水区花园路39号',
    address2: '国贸中心',
    city: '郑州市',
    state: '河南省',
    country: 'China'
  },

  // 湖南省
  {
    name: '何炅',
    address1: '芙蓉区五一大道389号',
    address2: '华创国际广场',
    city: '长沙市',
    state: '湖南省',
    country: 'China'
  },

  // 重庆市
  {
    name: '陈坤',
    address1: '渝中区解放碑步行街88号',
    address2: '重庆时代广场',
    city: '重庆市',
    state: '重庆市',
    country: 'China'
  },

  // 天津市
  {
    name: '郭德纲',
    address1: '和平区南京路189号',
    address2: '津汇广场',
    city: '天津市',
    state: '天津市',
    country: 'China'
  }
];

// 国外地址数据 - 覆盖全球主要国家和地区
const internationalAddressData = [
  // 美国 (United States)
  {
    name: 'JOHN SMITH',
    address1: '123 Main Street',
    address2: 'Apt 4B',
    city: 'New York',
    state: 'New York',
    country: 'United States'
  },
  {
    name: 'JANE DOE',
    address1: '456 Oak Avenue',
    address2: 'Suite 200',
    city: 'Los Angeles',
    state: 'California',
    country: 'United States'
  },
  {
    name: 'MICHAEL BROWN',
    address1: '789 Pine Road',
    address2: 'Unit 15',
    city: 'Chicago',
    state: 'Illinois',
    country: 'United States'
  },
  {
    name: 'SARAH WILSON',
    address1: '321 Elm Street',
    address2: 'Floor 3',
    city: 'Houston',
    state: 'Texas',
    country: 'United States'
  },
  {
    name: 'DAVID JONES',
    address1: '654 Maple Drive',
    address2: 'Building A',
    city: 'Phoenix',
    state: 'Arizona',
    country: 'United States'
  },
  {
    name: 'EMILY JOHNSON',
    address1: '890 Broadway',
    address2: 'Suite 1200',
    city: 'San Francisco',
    state: 'California',
    country: 'United States'
  },
  {
    name: 'CHRISTOPHER LEE',
    address1: '567 Fifth Avenue',
    address2: 'Floor 25',
    city: 'Seattle',
    state: 'Washington',
    country: 'United States'
  },

  // 加拿大 (Canada)
  {
    name: 'MARIA GARCIA',
    address1: '987 Cedar Lane',
    address2: 'Office 101',
    city: 'Toronto',
    state: 'Ontario',
    country: 'Canada'
  },
  {
    name: 'PIERRE DUBOIS',
    address1: '1234 Rue Saint-Catherine',
    address2: 'Apt 5C',
    city: 'Montreal',
    state: 'Quebec',
    country: 'Canada'
  },
  {
    name: 'JAMES ANDERSON',
    address1: '456 Granville Street',
    address2: 'Unit 8',
    city: 'Vancouver',
    state: 'British Columbia',
    country: 'Canada'
  },

  // 英国 (United Kingdom)
  {
    name: 'ROBERT TAYLOR',
    address1: '147 Birch Street',
    address2: 'Flat 2A',
    city: 'London',
    state: 'England',
    country: 'United Kingdom'
  },
  {
    name: 'ELIZABETH WINDSOR',
    address1: '25 Baker Street',
    address2: 'Apartment 3B',
    city: 'London',
    state: 'England',
    country: 'United Kingdom'
  },
  {
    name: 'WILLIAM SHAKESPEARE',
    address1: '42 Royal Mile',
    address2: 'Flat 1A',
    city: 'Edinburgh',
    state: 'Scotland',
    country: 'United Kingdom'
  },

  // 澳大利亚 (Australia)
  {
    name: 'JENNIFER DAVIS',
    address1: '258 Willow Court',
    address2: 'Level 5',
    city: 'Sydney',
    state: 'New South Wales',
    country: 'Australia'
  },
  {
    name: 'STEVE IRWIN',
    address1: '789 Collins Street',
    address2: 'Suite 12',
    city: 'Melbourne',
    state: 'Victoria',
    country: 'Australia'
  },
  {
    name: 'NICOLE KIDMAN',
    address1: '321 Queen Street',
    address2: 'Level 8',
    city: 'Brisbane',
    state: 'Queensland',
    country: 'Australia'
  },

  // 德国 (Germany)
  {
    name: 'HANS MUELLER',
    address1: 'Unter den Linden 77',
    address2: 'Büro 301',
    city: 'Berlin',
    state: 'Berlin',
    country: 'Germany'
  },
  {
    name: 'ANGELA SCHMIDT',
    address1: 'Maximilianstraße 35',
    address2: 'Etage 4',
    city: 'Munich',
    state: 'Bavaria',
    country: 'Germany'
  },
  {
    name: 'THOMAS WAGNER',
    address1: 'Königsallee 92',
    address2: 'Zimmer 205',
    city: 'Düsseldorf',
    state: 'North Rhine-Westphalia',
    country: 'Germany'
  },

  // 法国 (France)
  {
    name: 'MARIE DUBOIS',
    address1: '123 Champs-Élysées',
    address2: 'Appartement 6',
    city: 'Paris',
    state: 'Île-de-France',
    country: 'France'
  },
  {
    name: 'JEAN MARTIN',
    address1: '456 Rue de la République',
    address2: 'Bureau 12',
    city: 'Lyon',
    state: 'Auvergne-Rhône-Alpes',
    country: 'France'
  },
  {
    name: 'SOPHIE BERNARD',
    address1: '789 Boulevard de la Croisette',
    address2: 'Villa 3',
    city: 'Cannes',
    state: 'Provence-Alpes-Côte d\'Azur',
    country: 'France'
  },

  // 日本 (Japan)
  {
    name: 'HIROSHI TANAKA',
    address1: '1-2-3 Shibuya',
    address2: 'Tower 15F',
    city: 'Tokyo',
    state: 'Tokyo',
    country: 'Japan'
  },
  {
    name: 'YUKI YAMAMOTO',
    address1: '4-5-6 Namba',
    address2: 'Building 8F',
    city: 'Osaka',
    state: 'Osaka',
    country: 'Japan'
  },
  {
    name: 'AKIRA SUZUKI',
    address1: '7-8-9 Gion',
    address2: 'House 2F',
    city: 'Kyoto',
    state: 'Kyoto',
    country: 'Japan'
  },

  // 韩国 (South Korea)
  {
    name: 'KIM MIN-JUN',
    address1: '123 Gangnam-daero',
    address2: 'Office 1501',
    city: 'Seoul',
    state: 'Seoul',
    country: 'South Korea'
  },
  {
    name: 'PARK SO-YOUNG',
    address1: '456 Haeundae-ro',
    address2: 'Apt 802',
    city: 'Busan',
    state: 'Busan',
    country: 'South Korea'
  },

  // 新加坡 (Singapore)
  {
    name: 'TAN WEI MING',
    address1: '1 Marina Bay Sands',
    address2: 'Level 55',
    city: 'Singapore',
    state: 'Singapore',
    country: 'Singapore'
  },
  {
    name: 'LIM XIAO HUI',
    address1: '2 Orchard Road',
    address2: 'Unit 12-08',
    city: 'Singapore',
    state: 'Singapore',
    country: 'Singapore'
  },

  // 印度 (India)
  {
    name: 'RAJESH KUMAR',
    address1: 'Connaught Place',
    address2: 'Block A-123',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India'
  },
  {
    name: 'PRIYA SHARMA',
    address1: 'Marine Drive 456',
    address2: 'Floor 18',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India'
  },

  // 巴西 (Brazil)
  {
    name: 'CARLOS SILVA',
    address1: 'Avenida Paulista 1000',
    address2: 'Sala 2501',
    city: 'São Paulo',
    state: 'São Paulo',
    country: 'Brazil'
  },
  {
    name: 'ANA SANTOS',
    address1: 'Copacabana Beach 123',
    address2: 'Apt 1205',
    city: 'Rio de Janeiro',
    state: 'Rio de Janeiro',
    country: 'Brazil'
  },

  // 俄罗斯 (Russia)
  {
    name: 'VLADIMIR PETROV',
    address1: 'Red Square 1',
    address2: 'Office 301',
    city: 'Moscow',
    state: 'Moscow',
    country: 'Russia'
  },
  {
    name: 'NATASHA IVANOVA',
    address1: 'Nevsky Prospect 25',
    address2: 'Apt 45',
    city: 'Saint Petersburg',
    state: 'Saint Petersburg',
    country: 'Russia'
  },

  // 意大利 (Italy)
  {
    name: 'MARCO ROSSI',
    address1: 'Via del Corso 100',
    address2: 'Piano 3',
    city: 'Rome',
    state: 'Lazio',
    country: 'Italy'
  },
  {
    name: 'GIULIA FERRARI',
    address1: 'Via Montenapoleone 8',
    address2: 'Ufficio 12',
    city: 'Milan',
    state: 'Lombardy',
    country: 'Italy'
  },

  // 西班牙 (Spain)
  {
    name: 'CARLOS RODRIGUEZ',
    address1: 'Gran Vía 28',
    address2: 'Piso 5',
    city: 'Madrid',
    state: 'Madrid',
    country: 'Spain'
  },
  {
    name: 'MARIA GONZALEZ',
    address1: 'Las Ramblas 123',
    address2: 'Oficina 8',
    city: 'Barcelona',
    state: 'Catalonia',
    country: 'Spain'
  }
];

// 随机生成收票人信息
function generateBillToInfo(email: string, config?: AdvancedConfig): BillToInfo {
  // 如果有自定义配置，优先使用
  if (config?.customName || config?.customAddress1 || config?.customAddress2 ||
      config?.customCity || config?.customState || config?.customCountry) {
    // 如果有任何自定义字段，则混合使用自定义和随机
    const allAddressData = [...chinaAddressData, ...internationalAddressData];
    const randomAddress = allAddressData[Math.floor(Math.random() * allAddressData.length)];

    return {
      name: config.customName || randomAddress.name,
      address1: config.customAddress1 || randomAddress.address1,
      address2: config.customAddress2 || randomAddress.address2,
      city: config.customCity || randomAddress.city,
      state: config.customState || randomAddress.state,
      country: config.customCountry || randomAddress.country,
      email: email
    };
  }

  // 随机选择中国或国外地址（70%概率选择中国地址）
  const useChineseAddress = Math.random() < 0.7;
  const addressData = useChineseAddress ? chinaAddressData : internationalAddressData;
  const selectedAddress = addressData[Math.floor(Math.random() * addressData.length)];

  return {
    name: selectedAddress.name,
    address1: selectedAddress.address1,
    address2: selectedAddress.address2,
    city: selectedAddress.city,
    state: selectedAddress.state,
    country: selectedAddress.country,
    email: email
  };
}

// 生成日期范围 (基于支付日期)
function generateDateRange(datePaid: string): string {
  const paidDate = new Date(datePaid);
  const startDate = new Date(paidDate);
  const endDate = new Date(paidDate);
  endDate.setMonth(endDate.getMonth() + 1);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  return `${formatDate(startDate)} - ${formatDate(endDate)}, ${paidDate.getFullYear()}`;
}

// 主要的Invoice生成函数
export function generateRandomInvoice(email: string, config?: AdvancedConfig): InvoiceData {
  const invoiceNumber = generateInvoiceNumber();
  const receiptNumber = generateReceiptNumber();
  const datePaid = config?.customDatePaid || generateRandomDate();
  const paymentMethod = config?.customPaymentMethod || generatePaymentMethod();
  const billTo = generateBillToInfo(email, config);
  const amount = config?.customAmount || '$6.90';
  const description = config?.customDescription || 'Windsurf Pro';
  const dateRange = generateDateRange(datePaid);

  return {
    invoiceNumber,
    receiptNumber,
    datePaid,
    paymentMethod,
    billTo,
    amount,
    description,
    dateRange
  };
}
