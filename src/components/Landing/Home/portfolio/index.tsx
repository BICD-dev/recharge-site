
import { portfolioData } from '../../../../constants/crypto-price/data'
import { motion } from 'framer-motion'

const Portfolio = () => {
  return (
    <section className='bg-darkmode pt-12' id='portfolio'>
      <div className='container px-4 sm:px-6'>
        <div className='grid lg:grid-cols-2 items-center gap-20'>
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.6 }}
            className='lg:-ml-32'>
            <img
              src='/images/portfolio/img-portfolio.png'
              alt='Crypto Portfolio'
              width={780}
              height={700}
            />
          </motion.div>

          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.6 }}>
            <div className='flex flex-col gap-4'>
              {/* <p className='text-white font-medium'>
                Crypto landing page <span className='text-[#60da68]'>template</span>
              </p> */}
              <h2 className='text-white sm:text-40 text-30 mb-4 font-medium'>
                Create your cryptocurrency portfolio today
              </h2>
            </div>
            <p className='text-muted/60 text-18'>
              Coinbase has a variety of features that make it the best place
              to start trading.
            </p>

            <table className='w-full sm:w-[80%] mt-10'>
              <tbody>
                {portfolioData.map((item, index) => (
                  <tr key={index} className='border-b border-dark_border/10'>
                    <td className='py-5'>
                      <div className='bg-[#60da68]/20 p-3 rounded-full w-fit'>
                        <img
                          src={item.image}
                          alt={item.title}
                          width={50}
                          height={24}
                          className='fill-black stroke-black'
                        />
                        
                      </div>
                    </td>
                    <td className='py-5'>
                      <h4 className='text-muted text-xl ml-5'>
                        {item.title}
                      </h4>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
