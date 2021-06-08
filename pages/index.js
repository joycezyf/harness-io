import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import Marquee from 'react-fast-marquee'
import cx from 'classnames'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { GET_PAGE } from '../queries'
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

const Home = props => {
  const [imgLoaded, setImgLoaded] = useState({})
  // const [scrollTop, setScrollTop] = useState(0)
  const [clientWidth, setClientWidth] = useState(0)
  useEffect(() => {
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
      marketingSite: {
        heroTitle = 'The Modern Software Delivery Platform',
        heroSubTitle = `Loved by Developers
        Trusted by Businesses`,
        piplineTitle,
        pipelineDesc,
        developerTitle,
        developerDesc,
        aiTitle,
        aiDesc,
        governaceTitle,
        governaceDesc,
        cdTitle,
        cdSubTitle,
        cdDesc,
        ciTitle,
        ciSubTitle,
        ciDesc,
        cloudCostTitle,
        cloudCostSubTitle,
        cloudCostDesc,
        featureFlagsTitle,
        featureFlagsSubTitle,
        featureFlagsDesc,
        chIntelTitle,
        chIntelSubTitle,
        chIntelDesc,
        caseStudy1,
        caseStudy1Client,
        caseStudy2,
        caseStudy2Client
      } = {}
    } = {}
  } = props
  if (error) {
    return <Error />
  }

  const isMobile = clientWidth > 0 && clientWidth < 1440
  return (
    <>
      <Header />
      <main className={css.main}>
        <div className={css.harnessIntro}>
          <div className={css.introTextContainer}>
            <div className={css.introText}>{heroTitle}</div>
            <div
              className={css.introSubText}
              dangerouslySetInnerHTML={{
                __html: heroSubTitle.replace(/\n/g, '<br />')
              }}
            ></div>
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
          <div className={css.btnContaner}>
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
              <h3>{piplineTitle /* One Pipeline for All */}</h3>
              <div className={css.desc}>{pipelineDesc}</div>
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
                <h3>{developerTitle /* Developer-first Experience */}</h3>
                <div className={css.desc}>{developerDesc}</div>
              </div>
            </div>
          </div>

          <div className={css.sectionWLeft}>
            <div className={css.left}>
              <h3>{aiTitle /*AI/ML-Driven Workflows*/}</h3>
              <div className={css.desc}>{aiDesc}</div>
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
                  {governaceTitle /*Automated Governance &amp; Guardrails*/}
                </h3>
                <div className={css.desc}>{governaceDesc}</div>
              </div>
            </div>
          </div>

          <div className={cx(css.caseStudy, css.bgDot)}>
            <div className={css.sectionWrapper}>
              <div className={css.quote}>
                <img src="/quote.svg" width="34" height="26" />
              </div>
              <div className={css.customersSay}>{caseStudy1}</div>
              <div className={css.customerName}>{caseStudy1Client}</div>
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
              <h3>{cdTitle /*Continuous Delivery*/}</h3>
              <h6 className={css.subTitle}>{cdSubTitle}</h6>
              <div className={css.desc}>{cdDesc}</div>
              <div className={css.btnContaner}>
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
              <div className={css.btnContaner}>
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
              <div className={css.btnContaner}>
                <Button>Learn More</Button>
              </div>
            </div>
            <div className={css.bgTeal}>
              <div className={css.sectionExploreWRight}>
                <div className={css.left}></div>
                <div className={css.right}>
                  <h3>{ciTitle /*Continuous Integration*/}</h3>
                  <h6 className={css.subTitle}>{ciSubTitle}</h6>
                  <div className={css.desc}>{ciDesc}</div>
                  <div className={css.btnContaner}>
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
              <h3>{cloudCostTitle /*Cloud Cost Management*/}</h3>
              <h6 className={css.subTitle}>{cloudCostSubTitle}</h6>
              <div className={css.desc}>{cloudCostDesc}</div>
              <div className={css.btnContaner}>
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
              <div className={css.btnContaner}>
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
                <div className={css.btnContaner}>
                  <Button>Learn More</Button>
                </div>
              </div>
              <div className={css.right}>
                <h3>{featureFlagsTitle /*Feature Flags*/}</h3>
                <h6 className={css.subTitle}>{featureFlagsSubTitle}</h6>
                <div className={css.desc}>{featureFlagsDesc}</div>
                <div className={css.btnContaner}>
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
              <h3>{chIntelTitle /*Change Intelligence*/}</h3>
              <h6 className={css.subTitle}>{chIntelSubTitle}</h6>
              <div className={css.desc}>{chIntelDesc}</div>
              <div className={css.btnContaner}>
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
              <div className={css.btnContaner}>
                <Button>Learn More</Button>
              </div>
            </div>
          </div>

          <div className={cx(css.caseStudy, css.bgDotBlue)}>
            <div className={css.sectionWrapper}>
              <div className={css.quote}>
                <img src="/quote.svg" width="34" height="26" />
              </div>
              <div className={css.customersSay}>{caseStudy2}</div>
              <div className={css.customerName}>{caseStudy2Client}</div>
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
  const res = await client.query({ query: GET_PAGE, variables: { id: 1 } })
  return {
    props: res // will be passed to the page component as props
  }
}

export default Home
