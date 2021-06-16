import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { CloseCircleFilled, CheckCircleFilled } from '@ant-design/icons'
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

import css from './developer.module.scss'

const LearnDevopsTools = props => {
  const [imgLoaded, setImgLoaded] = useState({})
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
        heroTitle ,
        heroSubTitle,
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
        <div className={css.harnessIntroDV}>
          <div className={css.introTextContainer}>
            <div className={css.introText}>{heroTitle}</div>
            <div className={css.introSubText} >
              {/* Blazing Fast Deployment Pipelines in Minutes */}
            </div>
            
            <div className={css.introDesc}>
           {heroSubTitle}
            </div>
            {/* <Button type="primary" className={css.btnSignUp}>
              Sign Up for Free
            </Button> */}
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
            <img
              src="/developer-devops-tools-pic.svg"
              width="750"
              height="474"
              // muted={true}
              // autoPlay={true}
              // loop={true}
            />
          </div>
        </div>
      
        <div className={css.secondTitleContainer}>
       
            <h3 className={css.left}>DevOps Tools</h3>

            <div className={css.introDesc}>See how Harness compares to the other DevOps tools in the market.</div>

      
        </div>

        <div>
          <div className={css.compareContainer}>

            <div className={css.rowContainer}>

                  <div className={css.titleContainer}>
                    <img src="/icon-cd.svg" width="48" height="48" alt="CI" />
                      <text className={css.toolNameText}>Continuous Delivery</text>
                    </div>

                    <div className={css.vsContainer}>
                      <div className={css.introSubText}>vs</div>
                    </div>

                    <div className={css.allLogoContainer}>
                    
                  <div className={css.logoWrapper}>
                    
                        <div className={css.card}>
                          <div className={css.logoContainer}>
                          <img src="/devops-argo.svg" width="100" height="100" alt="AWS" />
                          <div className={css.logoText} >Argo CD</div>
                          </div>
                        </div>  

                  </div>

                  <div className={css.logoWrapper}>
                        <div className={css.card}>
                          <div className={css.logoContainer}>
                          <img src="/devops-octopus.svg" width="100" height="100" alt="AWS" />
                          <div className={css.logoText} >Octopus Deploy</div>
                          </div>
                        </div>  
                  </div>

                  <div className={css.logoWrapper}>

                        <div className={css.card}>
                          <div className={css.logoContainer}>
                          <img src="/devops-jenkins-x.svg" width="100" height="100" alt="AWS" />
                          <div className={css.logoText} >JenkinsX</div>
                          </div>
                        </div>  

                  </div>

                  <div className={css.logoWrapper}>

                        <div className={css.card}>
                          <div className={css.logoContainer}>
                          <img src="/devops-jenkin.svg" width="100" height="100" alt="AWS" />
                          <div className={css.logoText} >Jenkins</div>
                          </div>
                        </div>  
                  </div>
                  </div>

           
            </div>
          
            <div className={css.rowContainer}>

                  <div className={css.titleContainer}>
                    <img src="/icon-ci.svg" width="48" height="48" alt="CI" />
                      <text className={css.toolNameText}>Continuous Integration</text>
                    </div>

                    <div className={css.vsContainer}>
                      <div className={css.introSubText}>vs</div>
                    </div>
                    <div className={css.allLogoContainer}>
                  <div className={css.logoWrapper}>
                    
                        <div className={css.card}>
                          <div className={css.logoContainer}>
                          <img src="/devops-gitlab.svg" width="100" height="100" alt="AWS" />
                          <div className={css.logoText} >GitLab</div>
                          </div>
                        </div>  

                  </div>

                  <div className={css.logoWrapper}>
                        <div className={css.card}>
                          <div className={css.logoContainer}>
                          <img src="/devops-azure.svg" width="100" height="100" alt="AWS" />
                          <div className={css.logoText} >Azure DevOps</div>
                          </div>
                        </div>  
                  </div>
                  <div className={css.logoWrapper}>
                        <div className={css.card}>
                          <div className={css.logoContainer}>
                          <img src="/devops-bk.svg" width="100" height="100" alt="AWS" />
                          <div className={css.logoText} >Electric Cloud</div>
                          </div>
                        </div>  
                  </div>
                  </div>

            </div>
          
            <div className={css.rowContainer}>

                  <div className={css.titleContainer}>
                    <img src="/icon-ff.svg" width="48" height="48" alt="FF" />
                      <text className={css.toolNameText}>Feature Flags</text>
                    </div>

                    <div className={css.vsContainer}>
                      <div className={css.introSubText}>vs</div>
                    </div>
                    
                    <div className={css.allLogoContainer}>
                  <div className={css.logoWrapper}>
                    
                        <div className={css.card}>
                          <div className={css.logoContainer}>
                          <img src="/devops-argo.svg" width="100" height="100" alt="AWS" />
                          <div className={css.logoText} >Digital.AI</div>
                          </div>
                        </div>  

                  </div>

                  <div className={css.logoWrapper}>
                        <div className={css.card}>
                          <div className={css.logoContainer}>
                          <img src="/devops-bk.svg" width="100" height="100" alt="AWS" />
                          <div className={css.logoText} >Electric Cloud</div>
                          </div>
                        </div>  
                  </div>
                  </div>

            </div>
            
          
            <div className={css.rowContainer}>

              <div className={css.titleContainer}>
              <img src="/icon-ch-intel.svg" width="48" height="48" alt="FF" />
                <text className={css.toolNameText}>Change Intelligence</text>
              </div>

              <div className={css.vsContainer}>
                <div className={css.introSubText}>vs</div>
              </div>
              
              <div className={css.allLogoContainer}>
            <div className={css.logoWrapper}>
              
                  <div className={css.card}>
                    <div className={css.logoContainer}>
                    <img src="/devops-argo.svg" width="100" height="100" alt="AWS" />
                    <div className={css.logoText} >Digital.AI</div>
                    </div>
                  </div>  

            </div>

                  <div className={css.logoWrapper}>
                        <div className={css.card}>
                          <div className={css.logoContainer}>
                          <img src="/devops-bk.svg" width="100" height="100" alt="AWS" />
                          <div className={css.logoText} >Electric Cloud</div>
                          </div>
                        </div>  
                  </div>
                  </div>

</div>


            <div className={css.rowContainer}>

            <div className={css.titleContainer}>
            <img src="/icon-ccm.svg" width="48" height="48" alt="CCM" />
              <text className={css.toolNameText}>Cloud Cost Management</text>
            </div>

            <div className={css.vsContainer}>
              <div className={css.introSubText}>vs</div>
            </div>

            <div className={css.allLogoContainer}>
            <div className={css.logoWrapper}>

                <div className={css.card}>
                  <div className={css.logoContainer}>
                  <img src="/devops-argo.svg" width="100" height="100" alt="AWS" />
                  <div className={css.logoText} >Digital.AI</div>
                  </div>
                </div>  

            </div>

                </div>

            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

/* getStaticProps, TBD... */
export async function getStaticProps(context) {
  const res = await client.query({ query: GET_PAGE, variables: { id: 2} })
  return {
    props: res // will be passed to the page component as props
  }
}

export default LearnDevopsTools
