import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons'
import Marquee from 'react-fast-marquee'
import cx from 'classnames'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import axios from 'axios'

import {
  debounce,
  // getScrollTop,
  getClientWidth
} from '../../common/util'

import { GET_PRODUCT } from '../../queries'
import client from '../../common/apollo-client-ref'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Error from '../../components/Error'

import css from './platform.module.scss'

const ProductPlatform = props => {
  const [imgLoaded, setImgLoaded] = useState({})
  const [clientWidth, setClientWidth] = useState(0)

  const {
    // loading,
    error,
    data: {
      productPlatform: {
        id, published_at, created_at, updated_at, 
        title:title,
        feature:feature,
        quote:quote,
        product:product,
         option:option,
        secondaryTitle:secTitle,
    } = {}
    } = {}
  } = props
  if (error) {
    return <Error />
  }
 console.log("This is features , ",feature)

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

  function handleResize(e) {
    // const rawScrollTop = getScrollTop()
    const rawClientWidth = getClientWidth()
    // setScrollTop(rawScrollTop)
    setClientWidth(rawClientWidth)
  }
  const debounceResize = debounce(handleResize, 600)

  function handleImgLoad(e, imgId) {
    setTimeout(
      () =>
        setImgLoaded(loaded => Object.assign({}, loaded, { [imgId]: true })),
      500
    )
  }

  const isMobile = clientWidth > 0 && clientWidth < 1440
  return (
    <>
      <Header />
      <main className={css.main}>
        <div className={css.harnessIntroPlatform}>
          <div className={css.introTextContainer}>
            <div className={css.introText}>{title.Title}</div>
            <div
              className={css.introSubText}
              // dangerouslySetInnerHTML={{
              //   __html: heroSubTitle.replace(/\n/g, '<br />')
              // }}
            >
              {title.subTitle}
            </div>
            <div className={css.introDesc}>{title.Description}</div>
            <Button type="primary" className={css.btnSignUp}>
              Sign Up for Free
            </Button>
            <div className={css.gitStar}>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=drone&repo=ui-core&type=star&count=true"
                frameBorder="0"
                scrolling="0"
                width="150"
                height="20"
                title="GitHub"
              ></iframe>
            </div>
          </div>
          <div className={css.introIllustration}>
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
        </div>

        <div className={cx(css.platformModules, css.bgDot)}>
        <div className={css.inner}>
          <LazyLoadImage
            src="/product-platform-harnessbg.svg"
            className={css.harnessWatermark}
          />
          <h5 className={css.supTitle}>{secTitle.subTitle}</h5>
          <h2 className={css.title}>{secTitle.Title}</h2>
          <div className={css.desc}>{secTitle.Description}</div>
          <ul>
            {feature.map(item => (
              <li>
                <Link href={item.link}>
                  <a>
                    <div className={css.moduleContainer}>
                      <div className={css.icon}>
                        <img src={item.imageName} width="64" height="64" />
                      </div>
                      <div className={css.text}>
                        <h5 className={css.moduleTitle}>{item.featureTitle}</h5>
                        <div className={css.moduleDesc}>
                          {item.FeatureIntro}
                        </div>
                      </div>
                      <div className={css.buttons}>
                        <Button>Learn More</Button>
                      </div>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        </div>

        <div className={css.anchorLinks}>
          <ul>
            <li>
              <Link href="#">
                <a>Supported Platforms</a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>Hosting Options</a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>Integrations</a>
              </Link>
            </li>
            <li>
              <Link href="#">
                <a>Platform Modules</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className={css.platformContainer}>
          <h3 className={css.featuresTitle}>Features Every Great Team Needs</h3>
          <div className={css.productFeatures}>
            <ul>
              {product.map(item => (
                <li>
                  <div className={css.subIcon}>
                    <img src={item.imageName} width="45" height="42" />
                  </div>
                  <h5 className={css.subTitle}>{item.featureTitle}</h5>
                  <div className={css.subCon}>{item.FeatureIntro}</div>
                </li>
              ))}
            </ul>
          </div>

          <div className={cx(css.caseStudy, css.bgDot)}>
            <div className={css.sectionWrapper}>
              <div className={css.quote}>
                <img src="/quote.svg" width="34" height="26" />
              </div>
              <div className={css.customersSay}>{quote[0].quoteText}</div>
              <div className={css.customerName}>{quote[0].quoteName}</div>
              <Button className={css.btnLight}>Read Case Study</Button>
              <LazyLoadImage
                className={
                  imgLoaded.p1 ? css.profileRight : css.profileRightBeforeLoaded
                }
                src="/case-study-profile-platform-1.svg"
                placeholderSrc="/favicon.png"
                afterLoad={e => handleImgLoad(e, 'p1')}
                width="236"
                height="205"
              />
            </div>
          </div>

          <div className={css.sectionIntegrations}>
            <div className={css.inner}>
              <div className={css.text}>
                <div className={css.sup}>{option[0].optionSubTitle}</div>
                <div className={css.title}>
                 {option[0].OptionTitle}
                </div>
                <div className={css.desc}>
                  <p>
                   {option[0].optionDescription}
                  </p>
                </div>

                <Button>Learn More</Button>
              </div>
              <div className={css.logoWrapper}>
                <div className={css.logosPlatform}>
                  <img src="/icon_aws.svg" width="56" height="56" alt="AWS" />
                  <img src="/icon_gcp.svg" width="56" height="56" alt="GCP" />
                  <img
                    src="/icon_open_shift.svg"
                    width="56"
                    height="56"
                    alt="Open Shift"
                  />
                  <img
                    src="/icon_k8s.svg"
                    width="56"
                    height="56"
                    alt="Kubernetes"
                  />
                  <img
                    src="/icon_azure.svg"
                    width="56"
                    height="56"
                    alt="Azure"
                  />
                  <img
                    src="/icon_pivotal.svg"
                    width="56"
                    height="56"
                    alt="Pivotal"
                  />
                  <img
                    src="/icon_jenkins.svg"
                    width="56"
                    height="56"
                    alt="Jenkins"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={css.sectionOptions}>
            <div className={css.inner}>
              <div className={css.illus}>
                <LazyLoadImage
                  src="/product-platform-hosting-options.svg"
                  placeholderSrc="/favicon.png"
                  width="481"
                  height="245"
                />
              </div>
              <div className={css.text}>
                <div className={css.sup}>{option[1].optionSubTitle}</div>
                <h3 className={css.title}>{option[1].OptionTitle}</h3>
                <div className={css.desc}>
                  {option[1].optionDescription}
                </div>

                <Button type="primary">Get Started for Free</Button>
                <Button>Download</Button>
              </div>
            </div>
          </div>

          <div className={css.sectionIntegrations}>
            <div className={css.inner}>
              <div className={css.text}>
                <div className={css.sup}>{option[2].optionSubTitle}</div>
                <div className={css.title}>
                {option[2].OptionTitle}
                </div>
                <div className={css.desc}>
                  <p>
                   {option[2].optionDescription}
                  </p>
                  {/* <p>Talk about connectors</p> */}
                </div>

                <Button>Learn More</Button>
              </div>
              <div className={css.logoWrapper}>
                <div className={css.logosPlatform}>
                  <img src="/icon_aws.svg" width="56" height="56" alt="AWS" />
                  <img src="/icon_gcp.svg" width="56" height="56" alt="GCP" />
                  <img
                    src="/icon_open_shift.svg"
                    width="56"
                    height="56"
                    alt="Open Shift"
                  />
                  <img
                    src="/icon_k8s.svg"
                    width="56"
                    height="56"
                    alt="Kubernetes"
                  />
                  <img
                    src="/icon_azure.svg"
                    width="56"
                    height="56"
                    alt="Azure"
                  />
                  <img
                    src="/icon_pivotal.svg"
                    width="56"
                    height="56"
                    alt="Pivotal"
                  />
                  <img
                    src="/icon_jenkins.svg"
                    width="56"
                    height="56"
                    alt="Jenkins"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={cx(css.caseStudy, css.bgDotBlue)}>
            <div className={css.sectionWrapper}>
              <div className={css.quote}>
                <img src="/quote.svg" width="34" height="26" />
              </div>
              <div className={css.customersSay}>{quote[1].quoteText}</div>
              <div className={css.customerName}>{quote[1].quoteName}</div>
              <Button className={css.btnLight}>Read Case Study</Button>
              <LazyLoadImage
                className={
                  imgLoaded.p2 ? css.profileLeft : css.profileLeftBeforeLoaded
                }
                src="/case-study-profile-platform-2.svg"
                placeholderSrc="/favicon.png"
                afterLoad={e => handleImgLoad(e, 'p2')}
                width="313"
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

/* getStaticProps*/
export async function getStaticProps(context) {
  const res = await client.query({ query: GET_PRODUCT })
  return {
    props: res // will be passed to the page component as props
  }
}

export default ProductPlatform
