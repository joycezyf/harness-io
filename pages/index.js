import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Marquee from 'react-fast-marquee'
import cx from 'classnames'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { GET_HOME } from '../queries'
import {
  debounce,
  // getScrollTop,
  // scrollTo,
  getClientWidth
} from '../common/util'
import client from '../common/apollo-client-ref'

import css from './index.module.scss' // '../styles/index.module.scss'

// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import Error from '../components/Error'

//import API
import axios from 'axios'

const Home = props => {
  const [imgLoaded, setImgLoaded] = useState({})
  // const [scrollTop, setScrollTop] = useState(0)
  const [clientWidth, setClientWidth] = useState(0)


  // const [feature, setFeature] = useState([{},{},{},{}])
  // const [title, setTitle] = useState([])
  // const [explore,setExplore] = useState([{},{},{},{},{}])
  // const [caseStudy1,setCaseStudy1] = useState([])
  // const [caseStudy2,setCaseStudy2] = useState([])

  useEffect(() => {

    // console.log('Use effect')
    // //get data from strapi
    //   axios.get('http://34.94.233.59:1337/home').then(response => {
    //   console.log(" response is ",response.data)
    //   setTitle(response.data.title)
    //   setFeature(response.data.feature)
    //   setExplore(response.data.explore)
    //   setCaseStudy1(response.data.caseStudy1)
    //   setCaseStudy2(response.data.caseStudy2)


    // })


    debounceResize()
    if (window.addEventListener) {
      // window.addEventListener('scroll', debounceResize)
      window.addEventListener('resize', debounceResize)
      return function cleanup() {
        // window.removeEventListener('scroll', debounceResize)
        window.removeEventListener('resize', debounceResize)
      }
    } else if (window.attachEvent) {
      // window.attachEvent('onscroll', debounceResize)
      window.attachEvent('onresize', debounceResize)
      return function cleanup() {
        // window.detachEvent('onscroll', debounceResize)
        window.detachEvent('onresize', debounceResize)
      }
    }
  }, [])

  const handleResize = e => {
    // const rawScrollTop = getScrollTop()
    const rawClientWidth = getClientWidth()
    // setScrollTop(rawScrollTop)
    setClientWidth(rawClientWidth)
  }
  const debounceResize = debounce(handleResize, 600)

  const handleImgLoad = (e, imgId) => {
    setTimeout(
      () =>
        setImgLoaded(loaded => Object.assign({}, loaded, { [imgId]: true })),
      500
    )
  }

  const {
    // loading,
    error,
    data: {
      home: {
        id, published_at, created_at, updated_at, 
        title :title,
        feature:feature,
        caseStudy1:caseStudy1,
        caseStudy2:caseStudy2,
        explore:explore,
        
    } = {}
    } = {}
  } = props
  if (error) {
    return <Error />
  }

  //console.log("response is ",props)
  console.log("response is ",title)
  console.log("response 2 is ",feature)

  const isMobile = clientWidth > 0 && clientWidth < 1440
  return (
    <>
      <Header />
      <main className={css.main}>
        <div className={css.harnessIntro}>
          <div className={css.introTextContainer}>
            <div className={css.introText}>{title.Title}</div>
            <div
              className={css.introSubText}
              // dangerouslySetInnerHTML={{
              //   __html: heroSubTitle.replace(/\n/g, '<br />')
              // }}
            >{title.subTitle}</div>
            <Button type="primary" className={css.btnSignUp}>
              Sign Up for Free
            </Button>
            <div className={css.gitStar}>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=drone&repo=drone&type=star&count=true"
                frameBorder="0"
                scrolling="0"
                width="150"
                height="20"
                title="GitHub"
              ></iframe>
            </div>
          </div>
          {isMobile ? (
            <div className={css.introIllustration}>
              <video
                src="/harness-intro-mobile-hover.mp4"
                width="375"
                muted={true}
                autoPlay={true}
                loop={true}
              >
                {/* <source src="/harness-intro-mobile-hover.mp4" type="video/mp4" /> */}
                Sorry, your browser doesn't support embedded videos.
              </video>
              <a className={css.linkCI} href="#ci" />
              <a className={css.linkCD} href="#cd" />
              <a className={css.linkFeatureFlags} href="#feature-flags" />
              <a className={css.linkCloudCost} href="#cloud-cost" />
              <a className={css.linkChIntel} href="#ch-intel" />
            </div>
          ) : (
            <div className={css.introIllustration}>
              <video
                width="960"
                heiht="452"
                src="/harness-hero-hover-3.mp4"
                muted={true}
                autoPlay={true}
                loop={true}
              >
                {/* <source src="/harness-intro-hover.mp4" type="video/mp4" /> */}
                Sorry, your browser doesn't support embedded videos.
              </video>
              <a className={css.linkCI} href="#ci" />
              <a className={css.linkCD} href="#cd" />
              <a className={css.linkFeatureFlags} href="#feature-flags" />
              <a className={css.linkCloudCost} href="#cloud-cost" />
              <a className={css.linkChIntel} href="#ch-intel" />
            </div>
          )}
        </div>
        <div className={cx(css.customers, css.bgDot)}>
          <div className={css.consumerList}>
            <Marquee gradient={false}>
              <img
                className={css.marqueeImg}
                src="/logo-ebay-white.svg"
                width="228"
                height="64"
              />
              <img
                className={css.marqueeImg}
                src="/logo-meltwater-white.svg"
                width="228"
                height="64"
              />
              <img
                className={css.marqueeImg}
                src="/logo-openbank-white.svg"
                width="228"
                height="64"
              />
              <img
                className={css.marqueeImg}
                src="/logo-ncr-white.svg"
                width="228"
                height="64"
              />
              <img
                className={css.marqueeImg}
                src="/logo-schwab-white.svg"
                width="114"
                height="64"
              />
              <img
                className={css.marqueeImg}
                src="/logo-soulcycle-white.svg"
                width="228"
                height="64"
              />
              <img
                className={css.marqueeImg}
                src="/logo-nutanix-white.svg"
                width="228"
                height="64"
              />
            </Marquee>
          </div>
          <div className={css.btnContainer}>
            <Button className={css.btnLight}>Meet Our Customers</Button>
          </div>
        </div>
        <div className={css.motionPathContainer}>
          {/* <img src="/motion-path.svg" className={css.motionPathContent} /> */}
          <div className={css.motionPathContent}>
            <img
              src="/motion-path-woball-2.svg"
              width="1198" height="5601"
              // className={css.motionPathContent}
            />
          </div>
          <div className={css.sectionWLeft}>
            <div className={css.left}>
              <h3>{feature[0].featureTitle}</h3>
              <div className={css.desc}>{feature[0].FeatureIntro}</div>
            </div>
            <div className={css.right}>
              <LazyLoadImage
                src="/illus-pipline-2.svg"
                placeholderSrc="/favicon.png"
                width="770" height="375"
              />
            </div>
          </div>

          <div className={css.bgTeal}>
            <div className={css.sectionWRight}>
              <div className={css.left}>
                <LazyLoadImage
                  src="/illus-developer-first.svg"
                  placeholderSrc="/favicon.png"
                  width="710"
                  height="424"
                />
              </div>
              <div className={css.right}>
              <h3>{feature[1].featureTitle}</h3>
              <div className={css.desc}>{feature[1].FeatureIntro}</div>
              </div>
            </div>
          </div>

          <div className={css.sectionWLeft}>
            <div className={css.left}>
            <h3>{feature[1].featureTitle}</h3>
              <div className={css.desc}>{feature[1].FeatureIntro}</div>
            </div>
            <div className={css.right}>
              <LazyLoadImage
                src="/illus-ai-ml.svg"
                placeholderSrc="/favicon.png"
                width="588"
                height="376"
              />
            </div>
          </div>

          <div className={css.bgYellow}>
            <div className={css.sectionWRight}>
              <div className={css.left}>
                <LazyLoadImage
                  src="/illus-governance.svg"
                  placeholderSrc="/favicon.png"
                  width="738"
                  height="415"
                />
              </div>
              <div className={css.right}>
                <h3>
                  {feature[2].featureTitle /*Automated Governance &amp; Guardrails*/}
                </h3>
                <div className={css.desc}>{feature[2].FeatureIntro}</div>
              </div>
            </div>
          </div>

          <div className={cx(css.caseStudy, css.bgDot)}>
            <div className={css.sectionWrapper}>
              <div className={css.quote}>
                <img src="/quote.svg" width="34" height="26" />
              </div>
              <div className={css.customersSay}>{caseStudy1.quoteText}</div>
              <div className={css.customerName}>{caseStudy1.quoteName}</div>
              <Button className={css.btnLight}>Read Case Study</Button>
              <LazyLoadImage
                className={
                  imgLoaded.p1 ? css.profileRight : css.profileRightBeforeLoaded
                }
                src="/case-study-profile-1.svg"
                placeholderSrc="/favicon.png"
                afterLoad={e => handleImgLoad(e, 'p1')}
                width="236"
                height="205"
              />
            </div>
          </div>

          <div className={css.explore}>
            <h1>Explore</h1>
          </div>
          <div className={css.sectionWLeft} id="cd">
            <div className={css.left}>
              <h3>{explore[0].OptionTitle/*Continuous Delivery*/}</h3>
              <h6 className={css.subTitle}>{explore[0].optionSubTitle}</h6>
              <div className={css.desc}>{explore[0].optionDescription}</div>
              <div className={css.btnContainer}>
                <Button type="primary">Try It Out</Button>
                <Button>Learn More</Button>
              </div>
            </div>
            <div className={css.right}>
              <LazyLoadImage
                src="/illus-cd.svg"
                placeholderSrc="/favicon.png"
                width="860"
                height="460"
              />
              <div className={css.btnContainer}>
                <Button>Learn More</Button>
              </div>
            </div>
          </div>

          <div className={css.ciSectionWrapper} id="ci">
            <div className={css.preCI}>
              <LazyLoadImage
                src="/illus-ci.svg"
                placeholderSrc="/favicon.png"
                width="800"
                height="651"
              />
              <div className={css.btnContainer}>
                <Button>Learn More</Button>
              </div>
            </div>
            <div className={css.bgTeal}>
              <div className={css.sectionExploreWRight}>
                <div className={css.left}></div>
                <div className={css.right}>
                <h3>{explore[1].OptionTitle/*Continuous Delivery*/}</h3>
              <h6 className={css.subTitle}>{explore[1].optionSubTitle}</h6>
              <div className={css.desc}>{explore[1].optionDescription}</div>
                  <div className={css.btnContainer}>
                    <Button type="primary">Try It Out</Button>
                    <Button>Learn More</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cx(css.sectionWLeft, css.sectionCloudCost)}
            id="cloud-cost"
          >
            <div className={css.left}>
            <h3>{explore[2].OptionTitle/*Continuous Delivery*/}</h3>
              <h6 className={css.subTitle}>{explore[2].optionSubTitle}</h6>
              <div className={css.desc}>{explore[2].optionDescription}</div>
              <div className={css.btnContainer}>
                <Button type="primary">Try It Out</Button>
                <Button>Learn More</Button>
              </div>
            </div>
            <div className={css.right}>
              <LazyLoadImage
                src="/illus-cloud-cost.svg"
                placeholderSrc="/favicon.png"
                width="688"
                height="520"
              />
              <div className={css.btnContainer}>
                <Button>Learn More</Button>
              </div>
            </div>
          </div>

          <div className={css.bgYellow} id="feature-flags">
            <div className={css.sectionExploreWRight}>
              <div className={cx(css.left, css.FloatingImg)}>
                <LazyLoadImage
                  src="/illus-feature-flags.svg"
                  placeholderSrc="/favicon.png"
                  width="789"
                  height="543"
                />
                <div className={css.btnContainer}>
                  <Button>Learn More</Button>
                </div>
              </div>
              <div className={css.right}>
                <h3>{explore[3].OptionTitle /*Feature Flags*/}</h3>
                <h6 className={css.subTitle}>{explore[3].optionSubTitle}</h6>
                <div className={css.desc}>{explore[3].optionDescription}</div>
                <div className={css.btnContainer}>
                  <Button type="primary">Try It Out</Button>
                  <Button>Learn More</Button>
                </div>
              </div>
            </div>
          </div>

          <div
            className={cx(css.sectionWLeft, css.sectionChangeIntelligence)}
            id="ch-intel"
          >
            <div className={css.left}>
              <h3>{explore[4].OptionTitle /*Change Intelligence*/}</h3>
              <h6 className={css.subTitle}>{explore[4].optionSubTitle}</h6>
              <div className={css.desc}>{explore[4].optionDescription}</div>
              <div className={css.btnContainer}>
                <Button type="primary">Try It Out</Button>
                <Button>Learn More</Button>
              </div>
            </div>
            <div className={css.right}>
              <LazyLoadImage
                src="/illus-ch-intel.svg"
                placeholderSrc="/favicon.png"
                // afterLoad={e => handleImgLoad(e, 'change')}
                width="844"
                height="477"
              />
              <div className={css.btnContainer}>
                <Button>Learn More</Button>
              </div>
            </div>
          </div>

          <div className={cx(css.caseStudy, css.bgDotBlue)}>
            <div className={css.sectionWrapper}>
              <div className={css.quote}>
                <img src="/quote.svg" width="34" height="26" />
              </div>
              <div className={css.customersSay}>{caseStudy2.quoteText}</div>
              <div className={css.customerName}>{caseStudy2.quoteName}</div>
              <Button className={css.btnLight}>Read Case Study</Button>
              <LazyLoadImage
                className={
                  imgLoaded.p2 ? css.profileLeft : css.profileLeftBeforeLoaded
                }
                src="/case-study-profile-2.svg"
                placeholderSrc="/favicon.png"
                afterLoad={e => handleImgLoad(e, 'p2')}
                width="315"
                height="249"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps(context) {

  // const res = await fetch('http://34.94.233.59:1337/home')
  // const posts = await res.json()


   const res = await client.query({ query: GET_HOME})
   //console.log("response is ", res)

  return {
    props: res // will be passed to the page component as props
  }

}

export default Home
