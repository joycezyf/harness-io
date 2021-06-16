import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from 'antd'
import { UpOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import Marquee from 'react-fast-marquee'
import cx from 'classnames'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import {
  debounce,
  // getScrollTop,
  getClientWidth
} from '../../common/util'

import { GET_PAGE } from '../../queries'
import client from '../../common/apollo-client-ref'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Error from '../../components/Error'

import SvgCommunity from '../../public/icon_community.svg'
import SvgFree from '../../public/feature-pipeline.svg'
import SvgTeam from '../../public/feature-lib.svg'
import SvgEnterprise from '../../public/feature-security.svg'

import css from './pricing.module.scss'

const ProductPlatform = props => {
  const [imgLoaded, setImgLoaded] = useState({})
  const [clientWidth, setClientWidth] = useState(0)
  const [module, setModule] = useState('cd')
  const [showAll, setShowAll] = useState(false)

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

  const {
    // loading,
    error,
    data: {
      marketingSite: {
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
            <div className={css.introText}>Flexible Pricing for Every team</div>
            <div
              className={css.introSubText}
              // dangerouslySetInnerHTML={{
              //   __html: heroSubTitle.replace(/\n/g, '<br />')
              // }}
            >
              Sign up now, upgrade anytime.
            </div>
            <div className={css.introDesc}>
              Every new account gets a 14-day trial of our enterprise features.
            </div>
          </div>
          <div className={css.introIllustration}>{/* placeholder */}</div>
        </div>

        <div className={css.moduleTabs}>
          <h5 className={css.title}>Modules</h5>
          <ul>
            <li className={module == 'cd' ? css.cdActive : css.cd} onClick={()=>setModule('cd')}>
              <div className={css.icon}>
                <img src="/icon-cd.svg" width="40" height="40" />
              </div>
              <div className={css.names}>
                <div className={css.subName}>Continuous</div>
                <div className={css.name}>Delivery</div>
              </div>
            </li>
            <li className={module == 'ci' ? css.ciActive : css.ci} onClick={()=>setModule('ci')}>
              <div className={css.icon}>
                <img src="/icon-ci.svg" width="40" height="40" />
              </div>{' '}
              <div className={css.names}>
                <div className={css.subName}>Continuous</div>
                <div className={css.name}>Integration</div>
              </div>
            </li>
            <li className={module == 'cc' ? css.ccActive : css.cc} onClick={()=>setModule('cc')}>
              <div className={css.icon}>
                <img src="/icon-ccm.svg" width="40" height="40" />
              </div>{' '}
              <div className={css.names}>
                <div className={css.name}>Cloud Cost</div>
                <div className={css.subName}>Management</div>
              </div>
            </li>
            <li className={module == 'ff' ? css.ffActive : css.ff} onClick={()=>setModule('ff')}>
              <div className={css.icon}>
                <img src="/icon-ff.svg" width="40" height="40" />
              </div>{' '}
              <div className={css.names}>
                <div className={css.name}>Feature Flags</div>
                <div className={css.subName}>Management</div>
              </div>
            </li>
            <li className={module == 'chIntel' ? css.chIntelActive : css.chIntel} onClick={()=>setModule('chIntel')}>
              <div className={css.icon}>
                <img src="/icon-ch-intel.svg" width="40" height="40" />
              </div>{' '}
              <div className={css.names}>
                <div className={css.name}>Change</div>
                <div className={css.subName}>Intelligence</div>
              </div>
            </li>
          </ul>
        </div>

        <div className={cx(css.plans, css[module])}>
          <div className={cx(css.card, css[module])}>
            {/* <img src="/icon_community.svg" width="40" height="40" /> */}
            <SvgCommunity width="40" height="40" />
            <h3 className={css.name}>Community</h3>
            <div className={css.priceWUnit}>
              <span className={css.price}>$0</span>
              <span className>/month</span>
            </div>
            <Button>Download</Button>
            <ul>
              <li>On-premises only</li>
              <li>Kubernetes, VMs, Serverless, Custom</li>
              <li>Deployment verification</li>
              <li>5 workloads</li>
              <li>10 deployments/day</li>
            </ul>
          </div>

          <div className={css.card}>
            {/* <img src="/feature-pipeline.svg" width="40" height="40" /> */}
            <SvgFree width="40" height="40" />
            <h3 className={css.name}>Free</h3>
            <div className={css.priceWUnit}>
              <span className={css.price}>$0</span>
              <span className>/month</span>
            </div>
            <Button>Create A Free Account</Button>
            <ul>
              <li>On-premises only</li>
              <li>Kubernetes, VMs, Serverless, Custom</li>
              <li>Deployment verification</li>
              <li>5 workloads</li>
              <li>10 deployments/day</li>
            </ul>
          </div>

          <div className={css.card}>
            {/* <img src="/feature-lib.svg" width="40" height="40" /> */}
            <SvgTeam width="40" height="40" />
            <h3 className={css.name}>Team</h3>
            <div className={css.priceWUnit}>
              <span className={css.price}>$99</span>
              <span className>/month</span>
            </div>
            <Button type="primary">Try For Free</Button>
            <ul>
              <li>On-premises only</li>
              <li>Kubernetes, VMs, Serverless, Custom</li>
              <li>Deployment verification</li>
              <li>5 workloads</li>
              <li>10 deployments/day</li>
            </ul>
          </div>

          <div className={css.card}>
            {/* <img src="/feature-security.svg" width="40" height="40" /> */}
            <SvgEnterprise width="40" height="40" />
            <h3 className={css.name}>Enterprise</h3>
            <div className={css.priceWUnit}>
              <span className={css.price}>$175</span>
              <span className>/month</span>
            </div>
            <Button>Try For Free</Button>
            <ul>
              <li>On-premises only</li>
              <li>Kubernetes, VMs, Serverless, Custom</li>
              <li>Deployment verification</li>
              <li>5 workloads</li>
              <li>10 deployments/day</li>
            </ul>
          </div>
        </div>

        <div className={showAll ? css.showAll : css.collapse} onClick={()=>setShowAll(show => !show)}>
          <UpOutlined size={32} />
          <span>Show All Feature Comparison</span>
        </div>

        {showAll && (
          <div className={cx(css.morePlans, css[module])}>
            <table cellSpacing="0">
              <thead>
                <tr>
                  <th>Plans</th>
                  <th>
                    <h4>Community</h4>
                    <Button>Download</Button>
                  </th>
                  <th>
                    <h4>Free</h4>
                    <Button>Create A Free Account</Button>
                  </th>
                  <th>
                    <h4>Team</h4>
                    <Button type="primary">Try For Free</Button>
                  </th>
                  <th>
                    <h4>Enterprise</h4>
                    <Button>Try For Free</Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Services Supported</td>
                  <td>On-Premise Only</td>
                  <td>SAAS Only</td>
                  <td>SAAS Only</td>
                  <td>SAAS + On-Premise</td>
                </tr>
                <tr>
                  <td>Users</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Deployment Units</td>
                  <td>5</td>
                  <td>5</td>
                  <td>Maximum of 100</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Deployments per day</td>
                  <td>10</td>
                  <td>10</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Deployment Verification</td>
                  <td>
                    <CheckCircleFilled />
                  </td>
                  <td>
                    <CheckCircleFilled />
                  </td>
                  <td>
                    <CheckCircleFilled />
                  </td>
                  <td>
                    <CheckCircleFilled />
                  </td>
                </tr>
                <tr>
                  <td>Management at Scale</td>
                  <td>
                    <CloseCircleFilled />
                  </td>
                  <td>
                    <CloseCircleFilled />
                  </td>
                  <td>
                    <CloseCircleFilled />
                  </td>
                  <td>
                    Organizations Shared Resources &amp; Template Library Custom
                    Dashboards Data export &amp; reporting Log forwarding into
                    Splunk Delegate Scoping
                  </td>
                </tr>
                <tr>
                  <td>Security</td>
                  <td>Basic</td>
                  <td>Basic</td>
                  <td>Advanced</td>
                  <td>Whitelisting Audit Trail LDAP Authentication</td>
                </tr>
                <tr>
                  <td>Enterprise Governance</td>
                  <td>
                    <CloseCircleFilled />
                  </td>
                  <td>
                    <CloseCircleFilled />
                  </td>
                  <td>
                    <CloseCircleFilled />
                  </td>
                  <td>OPA Deployment Time Windows</td>
                </tr>
                <tr>
                  <td>Support</td>
                  <td>Community &amp; Docs</td>
                  <td>Community &amp; Docs</td>
                  <td>Standard + Premiere (20% premium)</td>
                  <td>Standard + Premiere (20% premium)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className={cx(css.customerMarquee, css.bgDotBlue)}>
          <Marquee gradient={false}>
            <ul>
              <li>
                <div className={css.quote}>
                  <img src="/quote.svg" width="24" height="24" />
                </div>
                <div className={css.customerSay}>
                  With Harness, I’m able to give engineers the same deployment
                  experience as a huge tech company with a giant DevOps team
                </div>
                <div className={css.customerName}>
                  Evan Thomas | Lead Software Engineer | Tilting Point
                </div>
                <div className={css.customerPic}>
                  <img
                    src="/customers-profile-pic.svg"
                    width="113"
                    height="98"
                  />
                </div>
                <Button className={css.btnLight}>Read Case Study</Button>
              </li>

              <li>
                <div className={css.quote}>
                  <img src="/quote.svg" width="24" height="24" />
                </div>
                <div className={css.customerSay}>
                  With Harness, I’m able to give engineers the same deployment
                  experience as a huge tech company with a giant DevOps team
                </div>
                <div className={css.customerName}>
                  Evan Thomas | Lead Software Engineer | Tilting Point
                </div>
                <div className={css.customerPic}>
                  <img
                    src="/customers-profile-pic.svg"
                    width="113"
                    height="98"
                  />
                </div>
                <Button className={css.btnLight}>Read Case Study</Button>
              </li>

              <li>
                <div className={css.quote}>
                  <img src="/quote.svg" width="24" height="24" />
                </div>
                <div className={css.customerSay}>
                  With Harness, I’m able to give engineers the same deployment
                  experience as a huge tech company with a giant DevOps team
                </div>
                <div className={css.customerName}>
                  Evan Thomas | Lead Software Engineer | Tilting Point
                </div>
                <div className={css.customerPic}>
                  <img
                    src="/customers-profile-pic.svg"
                    width="113"
                    height="98"
                  />
                </div>
                <Button className={css.btnLight}>Read Case Study</Button>
              </li>

              <li>
                <div className={css.quote}>
                  <img src="/quote.svg" width="24" height="24" />
                </div>
                <div className={css.customerSay}>
                  With Harness, I’m able to give engineers the same deployment
                  experience as a huge tech company with a giant DevOps team
                </div>
                <div className={css.customerName}>
                  Evan Thomas | Lead Software Engineer | Tilting Point
                </div>
                <div className={css.customerPic}>
                  <img
                    src="/customers-profile-pic.svg"
                    width="113"
                    height="98"
                  />
                </div>
                <Button className={css.btnLight}>Read Case Study</Button>
              </li>

              <li>
                <div className={css.quote}>
                  <img src="/quote.svg" width="24" height="24" />
                </div>
                <div className={css.customerSay}>
                  With Harness, I’m able to give engineers the same deployment
                  experience as a huge tech company with a giant DevOps team
                </div>
                <div className={css.customerName}>
                  Evan Thomas | Lead Software Engineer | Tilting Point
                </div>
                <div className={css.customerPic}>
                  <img
                    src="/customers-profile-pic.svg"
                    width="113"
                    height="98"
                  />
                </div>
                <Button className={css.btnLight}>Read Case Study</Button>
              </li>

              <li>
                <div className={css.quote}>
                  <img src="/quote.svg" width="24" height="24" />
                </div>
                <div className={css.customerSay}>
                  With Harness, I’m able to give engineers the same deployment
                  experience as a huge tech company with a giant DevOps team
                </div>
                <div className={css.customerName}>
                  Evan Thomas | Lead Software Engineer | Tilting Point
                </div>
                <div className={css.customerPic}>
                  <img
                    src="/customers-profile-pic.svg"
                    width="113"
                    height="98"
                  />
                </div>
                <Button className={css.btnLight}>Read Case Study</Button>
              </li>
            </ul>
          </Marquee>
        </div>
      </main>
      <Footer />
    </>
  )
}

/* getStaticProps, TBD... */
export async function getStaticProps(context) {
  const res = await client.query({ query: GET_PAGE, variables: { id: 1 } })
  return {
    props: res // will be passed to the page component as props
  }
}

export default ProductPlatform
