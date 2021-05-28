import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Button, Collapse } from 'antd'
import {
  GithubOutlined,
  DownOutlined,
  ExportOutlined,
  FacebookFilled,
  LinkedinFilled,
  TwitterOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons'
import Marquee from 'react-fast-marquee'
import cx from 'classnames'
import { LazyLoadImage } from 'react-lazy-load-image-component'
// import { Query } from 'react-apollo'

import { GET_PAGE } from '../queries'
import {
  debounce,
  getScrollTop,
  scrollTo,
  getClientWidth
} from '../common/util'
import client from '../common/apollo-client-ref'

import css from './index.module.scss'

const { Panel } = Collapse

export default function Home(props) {
  const [imgLoaded, setImgLoaded] = useState({})
  const [showProductMenu, setShowProductMenu] = useState(false)
  const [showCompanyMenu, setShowCompanyMenu] = useState(false)
  const [showLearnMenu, setShowLearnMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [clientWidth, setClientWidth] = useState(0)
  const [activeMobileMenu, setActiveMobileMenu] = useState([])
  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('scroll', debounceScroll)
      window.addEventListener('resize', debounceScroll)
      return function cleanup() {
        window.removeEventListener('scroll', debounceScroll)
        window.removeEventListener('resize', debounceScroll)
      }
    } else if (window.attachEvent) {
      window.attachEvent('onscroll', debounceScroll)
      window.attachEvent('onresize', debounceScroll)
      return function cleanup() {
        window.detachEvent('onscroll', debounceScroll)
        window.detachEvent('onresize', debounceScroll)
      }
    }
  })
  function switchProductMenu(e) {
    e.preventDefault()
    setShowCompanyMenu(false)
    setShowLearnMenu(false)
    setShowProductMenu(show => !show)
  }
  function switchCompanyMenu(e) {
    e.preventDefault()
    setShowProductMenu(false)
    setShowLearnMenu(false)
    setShowCompanyMenu(show => !show)
  }
  function switchLearnMenu(e) {
    e.preventDefault()
    setShowProductMenu(false)
    setShowCompanyMenu(false)
    setShowLearnMenu(show => !show)
  }
  function switchMoileMenu(e, isShow) {
    e.preventDefault()
    setShowMobileMenu(!!isShow)
  }
  function handleScroll(e) {
    const rawScrollTop = getScrollTop() // document.documentElement.scrollTop
    const rawClientTop = getClientWidth()
    setScrollTop(rawScrollTop)
    setClientWidth(rawClientTop)
  }
  const debounceScroll = debounce(handleScroll, 600)

  function handleCollapse(active) {
    // workaround, better solution TBD.
    if (active.length > activeMobileMenu.length) {
      const rawScrollTop = getScrollTop()
      scrollTo(0, rawScrollTop + 100)
    }
    setActiveMobileMenu([...active])
  }

  const menuProduct = (
    <div className={css.navMenu}>
      <div className={css.navMenuWrapper}>
        <div className={css.overview}>
          <img src="/icon-harness.svg" width="64" height="64" />
          <div className={css.moduleTitle}>Harness Platform</div>
          <div className={css.harnessIntro}>End-to-end Software Delivery</div>
        </div>
        <div className={css.modules}>
          <ul>
            <li>
              <div>
                <img src="/icon-cd.svg" width="64" height="64" />
              </div>
              <div>
                <div className={css.moduleTitle}>Continuous Delivery</div>
                <div className={css.harnessIntro}>
                  Fast &amp; secure deployment pipelines
                </div>
              </div>
            </li>
            <li>
              <div>
                <img src="/icon-ci.svg" width="64" height="64" />
              </div>
              <div>
                <div className={css.moduleTitle}>Continuous Integration</div>
                <div className={css.harnessIntro}>
                  Intelligent build &amp; test
                </div>
              </div>
            </li>
            <li>
              <div>
                <img src="/icon-ch-intel.svg" width="64" height="64" />
              </div>
              <div>
                <div className={css.moduleTitle}>Change Intelligence</div>
                <div className={css.harnessIntro}>
                  Keep sane with your change velocity
                </div>
              </div>
            </li>
            {/*   </ul>
        </div>
        <div className={css.modulesCol2}>
          <ul> */}
            <li>
              <div>
                <img src="/icon-ff.svg" width="64" height="64" />
              </div>
              <div>
                <div className={css.moduleTitle}>Feature Flags</div>
                <div className={css.harnessIntro}>Manage feature flags</div>
              </div>
            </li>
            <li>
              <div>
                <img src="/icon-ccm.svg" width="64" height="64" />
              </div>
              <div>
                <div className={css.moduleTitle}>Cloud Cost Management</div>
                <div className={css.harnessIntro}>
                  Manage &amp; optimize cloud costs
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )

  const menuLearn = (
    <div className={css.navMenuLearn}>
      <div className={css.navMenuWrapper}>
        <div className={css.learn}>
          <div className={css.title}>DEVELOPER</div>
          <ul>
            <li>
              <a>Documentation</a>
            </li>
            <li>
              <a>Integrations</a>
            </li>
            <li>
              <a>API</a>
            </li>
            <li>
              <a>DevOps tools</a>
            </li>
            <li>
              <a>Blogs</a>
            </li>
            <li>
              <a>
                Community <ExportOutlined />
              </a>
            </li>
          </ul>
        </div>
        <div className={css.learn}>
          <div className={css.title}>RESOURCES</div>
          <ul>
            <li>
              <a>Upcoming events and webinars</a>
            </li>
            <li>
              <a>On-demand videos</a>
            </li>
            <li>
              <a>Collaterals</a>
            </li>
          </ul>
        </div>
        <div className={css.learn}>
          <div className={css.title}>USE CASE</div>
          <div className={css.twoCols}>
            <ul>
              <li>
                <a>Self-Service Continuous Delivery</a>
              </li>
              <li>
                <a>Public Cloud Migration</a>
              </li>
              <li>
                <a>Kubernetes Deployments</a>
              </li>
              <li>
                <a>Scaling Beyond Jenkins Pipelines</a>
              </li>
              <li>
                <a>Spinnaker Not Enough</a>
              </li>
              <li>
                <a>Modern Applications</a>
              </li>
            </ul>
            <ul>
              <li>
                <a>DevSecOps – Compliance &amp; Governance</a>
              </li>
              <li>
                <a>Cloud Cost Management</a>
              </li>
              <li>
                <a>Kubernetes Deployments</a>
              </li>
              <li>
                <a>GitOps</a>
              </li>
              <li>
                <a>Automation</a>
              </li>
              <li>
                <a>Verification</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  const menuCompany = (
    <div className={css.navMenuCompany}>
      <div className={css.navMenuWrapper}>
        <ul>
          <li>
            <a>
              <div className={css.icon}>
                <img src="/co-about.svg" width="90" height="47" />
              </div>
              <div className={css.caption}>About Us</div>
            </a>
          </li>
          <li>
            <a>
              <div className={css.icon}>
                <img src="/co-news.svg" width="89" height="61" />
              </div>
              <div className={css.caption}>Press &amp; News</div>
            </a>
          </li>
          <li>
            <a>
              <div className={css.icon}>
                <img src="/co-partners.svg" width="90" height="27" />
              </div>
              <div className={css.caption}>Partners</div>
            </a>
          </li>
          <li>
            <a>
              <div className={css.icon}>
                <img src="/co-events.svg" width="63" height="86" />
              </div>
              <div className={css.caption}>Events</div>
            </a>
          </li>
          <li>
            <a>
              <div className={css.icon}>
                <img src="/co-tshirt.svg" width="70" height="66" />
              </div>
              <div className={css.caption}>T-Shirt Store</div>
            </a>
          </li>
          <li>
            <a>
              <div className={css.icon}>
                <img src="/co-careers.svg" width="72" height="69" />
              </div>
              <div className={css.caption}>Careers</div>
            </a>
          </li>
          <li>
            <a>
              <div className={css.icon}>
                <img src="/co-sales.svg" width="90" height="67" />
              </div>
              <div className={css.caption}>Contact Sales</div>
            </a>
          </li>
          <li>
            <a>
              <div className={css.icon}>
                <img src="/co-contact.svg" width="81" height="68" />
              </div>
              <div className={css.caption}>Contact HQ</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
  function handleImgLoad(e, imgId) {
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
    return (
      <div className="container">
        <img src="/harness-light.svg" />
        <h3>Ooooops! Something goes wrong...</h3>
        <div className="link">
          <Link href="/">
            <a>Head back to our Homepage</a>
          </Link>
        </div>
        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          h3 {
            margin: 36px;
          }
          .link {
            font-size: 18px;
            font-weight: 600;
          }
        `}</style>
      </div>
    )
  }

  const isMobile = clientWidth > 0 && clientWidth < 1440
  return (
    <>
      <Head>
        <title>Marketing site mockup</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap" rel="stylesheet" /> */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Reenie+Beanie:wght@400;500;600&display=swap"
        />
      </Head>
      <header className={css.header}>
        <div className={css.headerNavWrapper}>
          <div className={css.logo}>
            {/* <img src="/harness.svg" /> */}
            <a href="#">
              <div className={css.img}></div>
            </a>
          </div>
          <div className={css.globalNav}>
            <a
              className={showProductMenu ? css.dropdownSelected : css.dropdown}
              onClick={switchProductMenu}
              onMouseOver={e => e.preventDefault()}
            >
              Product
              <DownOutlined />
            </a>
            <a>Pricing</a>
            <a>Customers</a>
            <a
              className={showCompanyMenu ? css.dropdownSelected : css.dropdown}
              onClick={switchCompanyMenu}
              onMouseOver={e => e.preventDefault()}
            >
              Company
              <DownOutlined />
            </a>
            <a
              className={showLearnMenu ? css.dropdownSelected : css.dropdown}
              onClick={switchLearnMenu}
              onMouseOver={e => e.preventDefault()}
            >
              Learn
              <DownOutlined />
            </a>
            <Button type="primary">Sign Up</Button>
            <Button>Sign In</Button>
            <GithubOutlined className={css.icon} />
          </div>
          <div className={css.mobileMoreMenu}>
            <div className={css.signUp}>
              <Button type="primary">Sign Up</Button>
            </div>
            <div className={css.hamburgerMenu}>
              <MenuOutlined onClick={e => switchMoileMenu(e, true)} />
            </div>
          </div>
        </div>
        {showProductMenu && menuProduct}
        {showLearnMenu && menuLearn}
        {showCompanyMenu && menuCompany}
        <div
          className={
            showMobileMenu
              ? scrollTop < 48
                ? css.mobileSubMenu
                : css.mobileSubMenuScroll
              : css.mobileSubMenuOff
          }
        >
          <div className={css.fixedTopHeader}>
            <div className={css.logoNBtn}>
              <div className={css.logo}>
                <img src="/harness-light.svg" width="146" height="32" />
              </div>
              <div className={css.btnClose}>
                <CloseOutlined onClick={e => switchMoileMenu(e, false)} />
              </div>
            </div>
          </div>

          <div className={css.mobileSubMenuList}>
            <Collapse
              defaultActiveKey={['1']}
              expandIconPosition="right"
              ghost
              onChange={handleCollapse}
            >
              <Panel header="Products" key="1">
                <ul>
                  <li>Harness Platform</li>
                  <li>Continuous Integration</li>
                  <li>Continuous Delivery</li>
                  <li>Cloud Cost Management</li>
                  <li>Feature Flags</li>
                  <li>Change Intelligence</li>
                </ul>
              </Panel>
              <div className="ant-collapse-item">
                <div className="ant-collapse-header">Pricing</div>
              </div>
              <div className="ant-collapse-item">
                <div className="ant-collapse-header">Customers</div>
              </div>
              <Panel header="Company" key="2">
                <ul>
                  <li>Developers</li>
                  <li>Resources</li>
                  <li>Use Case</li>
                </ul>
              </Panel>
              <Panel header="Learn" key="3">
                <ul>
                  <li>About</li>
                  <li>Press &amp; News</li>
                  <li>Partners</li>
                  <li>Events</li>
                  <li>T-Shirt Store</li>
                  <li>Careers</li>
                  <li>Contact Sales</li>
                  <li>Contact HQ</li>
                </ul>
              </Panel>
            </Collapse>

            <div className={css.followUsTitle}>Follow Us</div>
            <ul className={css.followUsList}>
              <li>
                <GithubOutlined />
              </li>
              <li>
                <FacebookFilled />
              </li>
              <li>
                <LinkedinFilled />
              </li>
              <li>
                <TwitterOutlined />
              </li>
            </ul>
          </div>

          <div className={css.fixedBottom}></div>
        </div>
      </header>
      {!showMobileMenu && (
        <>
          <main className={css.main}>
            <div className={css.harnessIntro}>
              <div className={css.introTextContainer}>
                <div className={css.introText}>{heroTitle}</div>
                <div
                  className={css.introSubText}
                  dangerouslySetInnerHTML={{
                    __html: heroSubTitle.replace(/\n/g, '<br />')
                  }}
                >
                  {/* heroSubTitle.replace(/\n/g, '\r\n\n')*/}
                </div>
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
                  {/*
                        <LazyLoadImage
                          src="/harness-intro-mobile-hover.gif"
                          placeholderSrc="/harness-intro-mobile.svg"
                          usemap="#introMap"
                        />
                        <map name="introMap" id="introMap">
                          <area
                            shape="rect"
                            coords="48,36,185,142"
                            href="#ci"
                          />
                          <area
                            shape="rect"
                            coords="227,76,333,176"
                            href="#cd"
                          />
                          <area
                            shape="rect"
                            coords="11,211,166,322"
                            href="#feature-flags"
                          />
                          <area
                            shape="rect"
                            coords="195,240,370,348"
                            href="#ch-intel"
                          />
                          <area
                            shape="rect"
                            coords="40,416,215,536"
                            href="#cloud-cost"
                          />
                        </map>
                        */}
                </div>
              ) : (
                <div className={css.introIllustration}>
                  <video
                    width="960"
                    heiht="452"
                    src="/harness-hero-hover.mp4"
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
                  {/* <LazyLoadImage
                          src="/harness-intro-hover.gif"
                          placeholderSrc="/harness-intro.svg"
                          usemap="#introMap"
                        />
                        <map name="introMap" id="introMap">
                          <area
                            shape="rect"
                            coords="125,175,285,310"
                            href="#ci"
                          />
                          <area
                            shape="rect"
                            coords="327,188,439,315"
                            href="#cd"
                          />
                          <area
                            shape="rect"
                            coords="440,41,603,174"
                            href="#feature-flags"
                          />
                          <area
                            shape="rect"
                            coords="605,245,731,383"
                            href="#cloud-cost"
                          />
                          <area
                            shape="rect"
                            coords="710,46,887,182"
                            href="#ch-intel"
                          />
                        </map> */}
                </div>
              )}
            </div>
            <div className={cx(css.customers, css.bgDot)}>
              <div className={css.consumerList}>
                <Marquee gradient={false}>
                  <img src="/customer-logo.svg" width="228" height="64" />
                  <img src="/customer-logo.svg" width="228" height="64" />
                  <img src="/customer-logo.svg" width="228" height="64" />
                  <img src="/customer-logo.svg" width="228" height="64" />
                  <img src="/customer-logo.svg" width="228" height="64" />
                  <img src="/customer-logo.svg" width="228" height="64" />
                  <img src="/customer-logo.svg" width="228" height="64" />
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
                  src="/motion-path-woball.svg"
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
                    // className={cx({
                    //   [css.beforeLoaded]: !imgLoaded['pipleline']
                    // })}
                    src="/illus-pipline.svg"
                    placeholderSrc="/favicon.png"
                    // afterLoad={e => handleImgLoad(e, 'pipleline')}
                    width="825"
                    height="356"
                  />
                </div>
              </div>

              <div className={css.bgTeal}>
                <div className={css.sectionWRight}>
                  <div className={css.left}>
                    {/* <img src="/illus-developer-first.svg" /> */}
                    <LazyLoadImage
                      // className={cx({
                      //   [css.beforeLoaded]: !imgLoaded['developer']
                      // })}
                      src="/illus-developer-first.svg"
                      placeholderSrc="/favicon.png"
                      // afterLoad={e => handleImgLoad(e, 'developer')}
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
                  {/* <img src="/illus-ai-ml.svg" /> */}
                  <LazyLoadImage
                    // className={cx({
                    //   [css.beforeLoaded]: !imgLoaded['ai']
                    // })}
                    src="/illus-ai-ml.svg"
                    placeholderSrc="/favicon.png"
                    // afterLoad={e => handleImgLoad(e, 'ai')}
                    width="588"
                    height="376"
                  />
                </div>
              </div>

              <div className={css.bgYellow}>
                <div className={css.sectionWRight}>
                  <div className={css.left}>
                    {/* <img src="/illus-governance.svg" /> */}
                    <LazyLoadImage
                      // className={cx({
                      //   [css.beforeLoaded]: !imgLoaded['governance']
                      // })}
                      src="/illus-governance.svg"
                      placeholderSrc="/favicon.png"
                      // afterLoad={e => handleImgLoad(e, 'governance')}
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
                  {/* <img src="/favicon.png" className={css.profileRight} onLoad={e => handleImgLoad(e, '/case-study-profile-1.svg')} /> */}
                  <LazyLoadImage
                    className={
                      imgLoaded.p1
                        ? css.profileRight
                        : css.profileRightBeforeLoaded
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
                  {/* <img src="/illus-cd.svg" /> */}
                  <LazyLoadImage
                    // className={cx({
                    //   [css.beforeLoaded]: !imgLoaded['cd']
                    // })}
                    src="/illus-cd.svg"
                    placeholderSrc="/favicon.png"
                    // afterLoad={e => handleImgLoad(e, 'cd')}
                    width="860"
                    height="460"
                  />
                  <div className={css.btnContaner}>
                    <Button>Learn More</Button>
                  </div>
                </div>
              </div>
              {/* 111px */}

              <div className={css.ciSectionWrapper} id="ci">
                <div className={css.preCI}>
                  {/* <img src="/illus-ci.svg" /> */}
                  <LazyLoadImage
                    // className={cx({
                    //   [css.beforeLoaded]: !imgLoaded['ci']
                    // })}
                    src="/illus-ci.svg"
                    placeholderSrc="/favicon.png"
                    // afterLoad={e => handleImgLoad(e, 'ci')}
                    width="800"
                    height="651"
                  />
                  <div className={css.btnContaner}>
                    <Button>Learn More</Button>
                  </div>
                </div>
                <div className={css.bgTeal}>
                  <div className={css.sectionExploreWRight}>
                    <div className={css.left}>
                      {/* <img src="/illus-ci.svg" /> */}
                    </div>
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
                  {/* <img src="/illus-cloud-cost.svg" /> */}
                  <LazyLoadImage
                    // className={cx({
                    //   [css.beforeLoaded]: !imgLoaded['cost']
                    // })}
                    src="/illus-cloud-cost.svg"
                    placeholderSrc="/favicon.png"
                    // afterLoad={e => handleImgLoad(e, 'cost')}
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
                    {/* <img src="/illus-feature-flags.svg" /> */}
                    <LazyLoadImage
                      // className={cx({
                      //   [css.beforeLoaded]: !imgLoaded['flags']
                      // })}
                      src="/illus-feature-flags.svg"
                      placeholderSrc="/favicon.png"
                      // afterLoad={e => handleImgLoad(e, 'flags')}
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
                  {/* <img src="/illus-ch-intel.svg" /> */}
                  <LazyLoadImage
                    // className={cx({
                    //   [css.beforeLoaded]: !imgLoaded['change']
                    // })}
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
                  {/* <img src="/favicon.png" className={css.profileLeft} onLoad={e => handleImgLoad(e, '/case-study-profile-2.svg')} /> */}
                  <LazyLoadImage
                    className={
                      imgLoaded.p2
                        ? css.profileLeft
                        : css.profileLeftBeforeLoaded
                    }
                    src="/case-study-profile-2.svg"
                    placeholderSrc="/favicon.png"
                    // beforeLoad={e => handleImgLoad(e, 'p2')}
                    afterLoad={e => handleImgLoad(e, 'p2')}
                    width="315"
                    height="249"
                  />
                </div>
              </div>
            </div>
          </main>
          <footer className={css.footer}>
            <div className={css.siteMapNFollowUs}>
              <div className={css.siteMap}>
                <ul>
                  <div className={css.title}>Products</div>
                  <li>CI/CD Platform Overview</li>
                  <li>Continuous Integration</li>
                  <li>Continuous Delivery</li>
                  <li>Cloud Cost Management</li>
                  <li>Feature Flags</li>
                  <li>Change Intelligence</li>
                </ul>
                <ul>
                  <div className={css.title}>Use Cases</div>
                  <li>Self-Service Continuous Delivery</li>
                  <li>Public Cloud Migration</li>
                  <li>Kubernetes Deployments</li>
                  <li>Scaling Beyond Jenkins Pipelines</li>
                  <li>Spinnaker Not Enough</li>
                  <li>Modern Applications</li>
                  <li>DevSecOps – Compliance &amp; Governance</li>
                  <li>Cloud Cost Management</li>
                  <li>GitOps</li>
                  <li>Automation</li>
                  <li>Verification</li>
                </ul>
                <ul>
                  <div className={css.title}>Resources</div>
                  <li>Documentation</li>
                  <li>Integrations</li>
                  <li>API</li>
                  <li>DevOps tools</li>
                  <li>Blogs</li>
                  <li>
                    Community <ExportOutlined />
                  </li>
                  <li>Upcoming events and webinars</li>
                  <li>On-demand videos tools</li>
                  <li>Collaterals</li>
                </ul>
                <ul>
                  <div className={css.title}>Company</div>
                  <li>About</li>
                  <li>Press &amp; News</li>
                  <li>Partners</li>
                  <li>Events</li>
                  <li>T-Shirt Store</li>
                  <li>Careers</li>
                  <li>Contact Sales</li>
                  <li>Contact HQ</li>
                  <li>Customers</li>
                </ul>
                <ul>
                  <div className={css.title}>Pricing</div>
                  <li>Get Started</li>
                  <li>Contact Sales</li>
                  <li>Request a Quote</li>
                  <li>Jenkins vs Harness</li>
                  <li>Argo CD vs Harness</li>
                  <li>Spinnaker vs Harness</li>
                  <li>Kubecost vs Harness</li>
                  <li>Jenkins vs Drone</li>
                </ul>
              </div>
              <div className={css.logoIcons}>
                <div className={css.logo}>
                  {/* <img src="/harness.svg" /> */}
                  <div className={css.img}></div>
                </div>
                <ul className={css.followUs}>
                  <div>Follow us</div>
                  <li>
                    <GithubOutlined />
                  </li>
                  <li>
                    <FacebookFilled />
                  </li>
                  <li>
                    <LinkedinFilled />
                  </li>
                  <li>
                    <TwitterOutlined />
                  </li>
                </ul>
              </div>
            </div>
            <div className={css.termsNPolicies}>
              <ul>
                <li>Subscription Terms</li>
                <li>Website Terms of Use</li>
                <li>Privacy Policy</li>
                <li>Cookie Settings</li>
              </ul>
              <div className={css.copyRight}>© 2021 Harness Inc.</div>
            </div>
          </footer>
        </>
      )}
    </>
  )
}

export async function getStaticProps(context) {
  const res = await client.query({ query: GET_PAGE, variables: { id: 1 } })
  return {
    props: res // will be passed to the page component as props
  }
}
