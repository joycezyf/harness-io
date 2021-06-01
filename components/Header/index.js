import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
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

import { GET_PAGE } from '../../queries'
import {
  debounce,
  getScrollTop,
  scrollTo,
  getClientWidth
} from '../../common/util'
import client from '../../common/apollo-client-ref'

import css from './index.module.scss'

const { Panel } = Collapse

export default function Header(props) {
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

  function clearMenus(e) {
    e.preventDefault()
    setShowProductMenu(false)
    setShowCompanyMenu(false)
    setShowLearnMenu(false)
  }
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

  const subMenuMask = (
    <div className={css.subMenuMask} onClick={clearMenus}></div>
  )

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
              <Link href="/products">
                <a>
                  <div>
                    <img src="/icon-ci.svg" width="64" height="64" />
                  </div>
                  <div>
                    <div className={css.moduleTitle}>
                      Continuous Integration
                    </div>
                    <div className={css.harnessIntro}>
                      Intelligent build &amp; test
                    </div>
                  </div>
                </a>
              </Link>
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

            <Link href="/">
              <a>
                <div className={css.img}></div>
              </a>
            </Link>
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
      {(showProductMenu || showLearnMenu || showCompanyMenu) && subMenuMask}
    </>
  )
}

export async function getStaticProps(context) {
  const res = await client.query({ query: GET_PAGE, variables: { id: 1 } })
  return {
    props: res // will be passed to the page component as props
  }
}
