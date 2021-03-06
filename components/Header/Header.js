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

import {
  debounce,
  getScrollTop,
  scrollTo,
  getClientWidth
} from '../../common/util'

import css from './Header.module.scss'

const { Panel } = Collapse

const Header = () => {
  const [showProductMenu, setShowProductMenu] = useState(false)
  const [showCompanyMenu, setShowCompanyMenu] = useState(false)
  const [showLearnMenu, setShowLearnMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [clientWidth, setClientWidth] = useState(0)
  const [activeMobileMenu, setActiveMobileMenu] = useState([])
  useEffect(() => {
    debounceScroll()
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
  }, [])

  /**
   * Clear Menus
   * @param {object} e
   * Clears menus
   * does not return
   */
  const clearMenus = e => {
    e.preventDefault()
    setShowProductMenu(false)
    setShowCompanyMenu(false)
    setShowLearnMenu(false)
  }
  const switchProductMenu = e => {
    e.preventDefault()
    setShowCompanyMenu(false)
    setShowLearnMenu(false)
    setShowProductMenu(show => !show)
  }
  const switchCompanyMenu = e => {
    e.preventDefault()
    setShowProductMenu(false)
    setShowLearnMenu(false)
    setShowCompanyMenu(show => !show)
  }
  const switchLearnMenu = e => {
    e.preventDefault()
    setShowProductMenu(false)
    setShowCompanyMenu(false)
    setShowLearnMenu(show => !show)
  }
  const switchMobileMenu = (e, isShow) => {
    e.preventDefault()
    setShowMobileMenu(!!isShow)
    if (document && document.getElementsByTagName && clientWidth > 0 && clientWidth < 1440) {
      // to avoid the scolling bar caused by the main and footer section while mobile menu is showing up
      document.getElementsByTagName('main')[0].style.display = isShow
        ? 'none'
        : 'block'
      document.getElementsByTagName('footer')[0].style.display = isShow
        ? 'none'
        : 'block'
    }
  }
  const handleScroll = e => {
    const rawScrollTop = getScrollTop() // document.documentElement.scrollTop
    const rawClientWidth = getClientWidth()
    setScrollTop(rawScrollTop)
    setClientWidth(rawClientWidth)
  }
  const debounceScroll = debounce(handleScroll, 600)

  const handleCollapse = active => {
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
          <Link href="/products/platform">
            <a>
              <img src="/icon-harness.svg" width="64" height="64" />
            </a>
          </Link>
          <Link href="/products/platform">
            <a>
              <div className={css.moduleTitle}>Harness Platform</div>
              <div className={css.harnessIntro}>
                End-to-end Software Delivery
              </div>
            </a>
          </Link>
        </div>
        <div className={css.modules}>
          <ul>
            <li>
              <div>
                <Link href="/products/cd">
                  <a>
                    <img src="/icon-cd.svg" width="64" height="64" />
                  </a>
                </Link>
              </div>
              <Link href="/products/cd">
                <a>
                  <div>
                    <div className={css.moduleTitle}>Continuous Delivery</div>
                    <div className={css.harnessIntro}>
                      Fast &amp; secure deployment pipelines
                    </div>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <div>
                <Link href="/products/ci">
                  <a>
                    <img src="/icon-ci.svg" width="64" height="64" />
                  </a>
                </Link>
              </div>
              <Link href="/products/ci">
                <a>
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
                <Link href="/products/feature-flags">
                  <a>
                    <img src="/icon-ff.svg" width="64" height="64" />
                  </a>
                </Link>
              </div>
              <Link href="/products/feature-flags">
                <a>
                  <div>
                    <div className={css.moduleTitle}>Feature Flags</div>
                    <div className={css.harnessIntro}>Manage feature flags</div>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <div>
                <Link href="/products/cloud-cost">
                  <a>
                    <img src="/icon-ccm.svg" width="64" height="64" />
                  </a>
                </Link>
              </div>
              <Link href="/products/cloud-cost">
                <a>
                  <div>
                    <div className={css.moduleTitle}>Cloud Cost Management</div>
                    <div className={css.harnessIntro}>
                      Manage &amp; optimize cloud costs
                    </div>
                  </div>
                </a>
              </Link>
            </li>
            <li>
              <div>
                <Link href="/products/ch-intel">
                  <a>
                    <img src="/icon-ch-intel.svg" width="64" height="64" />
                  </a>
                </Link>
              </div>
              <Link href="/products/ch-intel">
                <a>
                  <div>
                    <div className={css.moduleTitle}>Change Intelligence</div>
                    <div className={css.harnessIntro}>
                      Keep sane with your change velocity
                    </div>
                  </div>
                </a>
              </Link>
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
            <Link href="/learn/developer/devops-tools">
              <a>DevOps tools</a>
              </Link>
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
                <a>DevSecOps ??? Compliance &amp; Governance</a>
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
            <Link href="/company/about-us">
              <a>
                <div className={css.icon}>
                  <img src="/co-about.svg" width="90" height="47" />
                </div>
                <div className={css.caption}>About Us</div>
              </a>
            </Link>
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
            <Link href="/company/careers">
              <a>
                <div className={css.icon}>
                  <img src="/co-careers.svg" width="72" height="69" />
                </div>
                <div className={css.caption}>Careers</div>
              </a>
            </Link>
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

  const isMobile = clientWidth > 0 && clientWidth < 1440

  return (
    <>
      <Head>
        <title>
          Harness - Self-Service CI/CD Tool for DevOps Teams &amp; Engineers
        </title>
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
          <div className={css.logo} onClick={clearMenus}>
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
              // onMouseOver={e => e.preventDefault()}
            >
              Product
              <DownOutlined />
            </a>
            <Link href="/pricing"><a>Pricing</a></Link>
            <Link href="/customers"><a>Customers</a></Link>
            <a
              className={showCompanyMenu ? css.dropdownSelected : css.dropdown}
              onClick={switchCompanyMenu}
              // onMouseOver={e => e.preventDefault()}
            >
              Company
              <DownOutlined />
            </a>
            <a
              className={showLearnMenu ? css.dropdownSelected : css.dropdown}
              onClick={switchLearnMenu}
              // onMouseOver={e => e.preventDefault()}
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
              <MenuOutlined onClick={e => switchMobileMenu(e, true)} />
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
                <CloseOutlined onClick={e => switchMobileMenu(e, false)} />
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
                  <li>
                    <Link href="/products/ci">
                      <a>Continuous Integration</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/cd">
                      <a>Continuous Delivery</a>
                    </Link>
                  </li>
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

export default Header
