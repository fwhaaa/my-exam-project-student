import { Card } from '@arco-design/web-react';
import { Link } from "react-router-dom";
import '../index.css';

const { Grid, Meta } = Card;

const Home = () => {
  return (
   <div>
    <p>同学 冯文豪 你好！请选择考试科目：</p>
    <Card bordered={false} style={{ width: '100%', paddingTop: '56px'}}>
        {['math', 'english','art','sports','software'].map((value, index) => {
          const hoverable = index % 2 === 0;
          return (
            <Grid
              key={index}
              hoverable={hoverable}
              style={{
                width: '360px',
                background: '#b7ffff',
                height: '300px',
                borderRadius: '24px',
                margin: '20px',
                cursor: 'pointer',
              }}
            >
                <Card
                      className='card-custom-hover-style'
                      title='科目'
                      extra={<Link to={`/exam/list/${value}`}>查看</Link>}
                      bordered={false}
                      cover={
                        <div style={{ height: 204, overflow: 'hidden' }}>
                          <img
                            style={{ width: '100%', transform: 'translateY(-20px)' }}
                            alt='dessert'
                            src='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp'
                          />
                        </div>
                      }
                      
                    >
                    <Meta
                      title={value}
                    />
                    </Card>
            </Grid>
          );
        })}
      </Card>
   </div>
  );
};

export default Home;