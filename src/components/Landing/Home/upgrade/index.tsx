/* eslint-disable @typescript-eslint/no-unused-vars */

import { upgradeData } from '../../../../constants/crypto-price/data'

const Upgrade = () => {
  const Icon = ({ className = '', icon }: { className?: string; icon?: string, width:string, height:string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    {/* simple generic icon (info/exclamation style) used as a drop-in */}
    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 14.5h-2v-2h2v2zm0-4.5h-2V7h2v5z" />
  </svg>
)
  return (
    <section className='py-20' id='upgrade'>
      <div className='container px-4'>
        <div className='grid lg:grid-cols-2 gap-10 items-center'>
          <div>
            <p className='text-slate-700 font-medium'>Datafy<span className='text-[#60da68]'>upgrade</span></p>
            <h2 className='text-slate-700 sm:text-40 text-30  font-medium mb-5'>
              Power your payments and crypto with Datafy
            </h2>
            <p className='text-slate-700 text-18 mb-7'>
              Fast, secure, and affordable tools to pay bills, buy airtime, and trade crypto—no middlemen, no hassle.
            </p>
            <div className='grid sm:grid-cols-2  text-nowrap gap-5'>
              {upgradeData.map((item, index) => (
                <div key={index} className='flex gap-5'>
                  <div>
                    <Icon
                      icon='la:check-circle-solid'
                      width='24'
                      height='24'
                      className='text-slate-700 group-hover:text-[#60da68]'
                    />
                  </div>
                  <div>
                    <h4 className='text-18 text-slate-700'>{item.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className='ml-0 lg:ml-7'>
              <img
                src='/images/upgrade/img-upgrade.png'
                alt='image'
                width={625}
                height={580}
                className='-mr-5'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Upgrade
