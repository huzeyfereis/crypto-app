import React, { Fragment, useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'
import { Link } from 'react-router-dom'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { Loader } from '.'

const { Text, Title } = Typography
const { Option } = Select

const demoImage =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  })
  const { data } = useGetCryptosQuery(100)
  if (!cryptoNews?.value) return <Loader />
  return (
    <Fragment>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Latest crypto news.
        </Title>
        {simplified && (
          <Title level={5} className='show-more'>
            <Link to='/news'>Show More</Link>
          </Title>
        )}
      </div>
      <Row gutter={[16, 16]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className='select-news'
              placeholder='Select a crypto'
              optionFilterProp='children'
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }>
              <Option key='Cryptocurrency' value='Cryptocurrency'>
                Cryptocurrency
              </Option>
              {data?.data?.coins.map((coin) => (
                <Option key={coin.name} value={coin.name}>
                  {coin.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews?.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Title className='news-title' level={5}>
                    {news.name}
                  </Title>
                  <img
                    style={{
                      maxWidth: '200px',
                      maxHeight: '100px',
                      margin: '0 5px',
                    }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt='news-pic'
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar
                      src={news.image?.thumbnail?.contentUrl || demoImage}
                      alt='news'
                    />
                    <Text className='provider-name'>
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf('ss').fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </Fragment>
  )
}

export default News
