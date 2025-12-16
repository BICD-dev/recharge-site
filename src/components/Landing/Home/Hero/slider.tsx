import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { pricedeta } from '../../../../constants/crypto-price/data';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface BinancePriceResponse {
  symbol: string;
  price: string;
}

interface PriceData {
  usd: number;
  symbol: string;
}

const CardSlider = () => {
  const [prices, setPrices] = useState<Record<string, PriceData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mapping of cryptocurrency names to Binance trading pairs
  const symbolMapping: Record<string, string> = {
    bitcoin: 'BTCUSDT',
    ethereum: 'ETHUSDT',
    binancecoin: 'BNBUSDT',
    bnb: 'BNBUSDT',
    ripple: 'XRPUSDT',
    xrp: 'XRPUSDT',
    cardano: 'ADAUSDT',
    solana: 'SOLUSDT',
    polkadot: 'DOTUSDT',
    dogecoin: 'DOGEUSDT',
    avalanche: 'AVAXUSDT',
    polygon: 'MATICUSDT',
    litecoin: 'LTCUSDT',
    chainlink: 'LINKUSDT',
    // Add more mappings as needed
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Get the Binance symbols we need to fetch
        const symbols = pricedeta
          .map(item => symbolMapping[item.title.toLowerCase()])
          .filter(Boolean);

        if (symbols.length === 0) {
          throw new Error('No valid trading pairs found');
        }

        // Method 1: Fetch individual prices (more targeted)
        // const pricePromises = symbols.map(symbol =>
        //   axios.get<BinancePriceResponse>(
        //     `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`
        //   )
        // );
        // const responses = await Promise.all(pricePromises);

        // Method 2: Fetch all prices at once (more efficient for multiple coins)
        const response = await axios.get<BinancePriceResponse[]>(
          'https://api.binance.com/api/v3/ticker/price'
        );

        // Filter for only the symbols we need
        const filteredPrices = response.data.filter(item =>
          symbols.includes(item.symbol)
        );

        // Format the prices into our state structure
        const formattedPrices: Record<string, PriceData> = {};
        
        filteredPrices.forEach(priceData => {
          // Find the original coin name from the symbol
          const coinName = Object.keys(symbolMapping).find(
            key => symbolMapping[key] === priceData.symbol
          );

          if (coinName) {
            formattedPrices[coinName] = {
              usd: parseFloat(priceData.price),
              symbol: priceData.symbol
            };
          }
        });

        setPrices(formattedPrices);
        setError(null);
      } catch (err) {
        console.error('Error fetching prices from Binance:', err);
        if (axios.isAxiosError(err)) {
          setError(`Failed to fetch prices: ${err.message}`);
        } else {
          setError('Failed to load cryptocurrency prices');
        }
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchPrices();

    // Update prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed: 1500,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const formatPrice = (price: number): string => {
    if (price >= 1) {
      return price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      // For prices less than $1, show more decimal places
      return price.toLocaleString('en-US', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 6,
      });
    }
  };

  const getPrice = (coinTitle: string): string => {
    const key = Object.keys(prices).find(
      priceKey => priceKey.toLowerCase() === coinTitle.toLowerCase()
    );

    if (loading) return '...';
    if (!key || !prices[key]) return 'N/A';
    
    return formatPrice(prices[key].usd);
  };

  return (
    <div className='pt-14 flex flex-col gap-10'>
      <div className='flex flex-col gap-3 items-center justify-center text-center'>
        <p className='text-white font-medium'>
          Featured <span className='text-[#60da68]'>crypto coins</span>
        </p>
        <h2 className='sm:text-40 text-30 text-white font-medium'>
          Top crypto coins updates
        </h2>
      </div>

      {error && (
        <div className='text-center text-red-500 text-sm px-4'>
          {error}
        </div>
      )}

      <Slider {...settings}>
        {pricedeta.map((item, index) => (
          <div key={index} className='pr-6'>
            <div className='px-5 py-6 bg-dark_grey/80 rounded-xl'>
              <div className='flex flex-col items-center gap-5'>
                <div className={`${item.background} ${item.padding} rounded-full`}>
                  <img
                    src={item.icon}
                    alt={`${item.title} icon`}
                    width={item.width}
                    height={item.height}
                  />
                </div>
                <p className='text-white text-xs font-normal'>
                  <span className='text-16 font-bold mr-2'>{item.title}</span>
                  {item.short}
                </p>
              </div>
              <div className='flex justify-center mt-2'>
                <div>
                  <p className='text-xl font-bold text-white mb-0 leading-none'>
                    ${getPrice(item.title)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardSlider;