import { useEffect, React, useState } from 'react'
import book1 from '../imgs/Book1.jpg'
import book2 from '../imgs/Book2.jpg'
import book3 from '../imgs/Book3.jpg'
import book4 from '../imgs/Book4.jpg'
import book5 from '../imgs/Book5.jpg'
import {slugify} from '../utils/slugify'
export const novelData = [
    {
        id: 1,
        title: "Tự Cẩm",
        author: "Đông Thiên Đích Liễu Diệp",
        img: book1,
        chapters: 828,
        description: "Trong kinh thành mọi người đều đồn đại rằng ở trong Khương gia thì Tứ tiểu thư nổi tiếng là một đại tuyệt sắc mỹ nhân. Nhưng đáng tiếc là đáng tiếc lúc nàng xinh đẹp nhất lại bị phủ An quốc công chọn trúng. Không chỉ vậy mà đêm trước khi Khương Tự xuất giá, vị hôn phu cùng nữ nhân khác nhảy sông tự tử..",
        categories: ["Ngôn tình"]
    },
    {
        id: 2,
        title: "Trùng Sinh: Rồng Ở Đô Thị",
        author: "Phương Minh",
        img: book2,
        chapters: 49,
        description: "Thương Long - cao thủ của đội đặc chủng Người chấp pháp mạnh nhất Hoa Hạ bị người khác hãm hại, linh hồn trùng sinh vào cơ thể cúa một cậu ấm ăn chơi sa đọa, từ đỏ mở ra cuộc đời hoàn toàn mới. Người đẹp trong lòng, thiên hạ trong ngực.",
        categories: ["Truyện Teen"]
    },
    {
        id: 3,
        title: "Linh Vũ Thiên Hạ",
        author: "Vũ Phong",
        img: book3,
        chapters: 5024,
        description: "Lục Thiếu Du, linh hồn bị xuyên qua đến thế giới khác, nhập vào thân thể của một thiếu gia không có địa vị phải trải qua cuộc sống không khác gì nô bộc. Thế giới này lấy Vũ vi cường, lấy Linh vi tôn, nghe đồn khi võ đạo đỉnh phong, linh đạo đạt đến cực hạn có thể phá toái hư không. Lục Thiếu Du mang theo ký ức từ kiếp trước tái sinh, không cam lòng làm một thiếu gia chẳng khác gì củi mục.",
        categories: ["Tiên hiệp"]
    },
    {
        id: 4,
        title: "Sắc Xuân Gửi Người Tình",
        author: "Xá Mục Tư",
        img: book4,
        chapters: 11,
        description: "– Trang Khiết này, anh làm người tình của em nhé.\n \ – Hả?\n \ – Anh – Trần Mạch Đông\n \ – chấp nhận sa ngã làm người tình của em. Đây là câu chuyện viết về tình yêu của một cặp trai gái không nên nết. Về tình bạn “tao sẽ yêu mày 60 năm”.",
        categories: ["Ngôn tình"]
    },
    {
        id: 5,
        title: "Đức Dương Quận Chúa",
        author: "Thâm Hải Lý Đích Vân Đóa",
        img: book5,
        chapters: 156,
        description: "Bạn đang đọc truyện Đức Dương Quận Chúa của tác giả Thâm Hải Lý Đích Vân Đóa. Nàng tên Ân Trường Hoan, là quận chúa Đức Dương, sinh ra là một cái mỹ nhân, quyến rũ động lòng người, nhận được ngàn vạn sủng ái.\n \ Mặc dù chỉ là quận chúa nhưng vẫn có thể sống thoải mái tiêu dao, lại còn muốn gì được dó, chính là vì có Thái Hậu ngoại tổ mẫu làm chỗ dựa, hết mực cưng chiều nàng. \n \ Nhưng biến cố bỗng nhiên dồn dập tới, Thái Hậu hoăng, mà sau đó chính là vị hôn phu bội ước.\n \ Nàng cũng thất vọng buồn lòng, nghĩ.\n \ Nàng mở mắt ra lần nữa, mơ mơ màng màng, nhận ra mình được trời cao thương xót, cho trọng sinh trở về. Nàng trước tiên dĩ nhiên chính là cứu ngoại tổ mẫu của mình, sau đó.....Cáo trạng!! Sau khi từ hôn.\n \ Lời nói của Thái Hậu thấm thía: Trường Hoan à, cháu muốn quận mã thế nào?",
        categories: ["Ngôn tình"]
    },
      {
        id: 1,
        title: "Tự Cẩm",
        author: "Đông Thiên Đích Liễu Diệp",
        img: book1,
        chapters: 828,
        description: "Trong kinh thành mọi người đều đồn đại rằng ở trong Khương gia thì Tứ tiểu thư nổi tiếng là một đại tuyệt sắc mỹ nhân. Nhưng đáng tiếc là đáng tiếc lúc nàng xinh đẹp nhất lại bị phủ An quốc công chọn trúng. Không chỉ vậy mà đêm trước khi Khương Tự xuất giá, vị hôn phu cùng nữ nhân khác nhảy sông tự tử..",
        categories: ["Ngôn tình"]
    },
    {
        id: 2,
        title: "Trùng Sinh: Rồng Ở Đô Thị",
        author: "Phương Minh",
        img: book2,
        chapters: 49,
        description: "Thương Long - cao thủ của đội đặc chủng Người chấp pháp mạnh nhất Hoa Hạ bị người khác hãm hại, linh hồn trùng sinh vào cơ thể cúa một cậu ấm ăn chơi sa đọa, từ đỏ mở ra cuộc đời hoàn toàn mới. Người đẹp trong lòng, thiên hạ trong ngực.",
        categories: ["Truyện Teen"]
    },
    {
        id: 3,
        title: "Linh Vũ Thiên Hạ",
        author: "Vũ Phong",
        img: book3,
        chapters: 5024,
        description: "Lục Thiếu Du, linh hồn bị xuyên qua đến thế giới khác, nhập vào thân thể của một thiếu gia không có địa vị phải trải qua cuộc sống không khác gì nô bộc. Thế giới này lấy Vũ vi cường, lấy Linh vi tôn, nghe đồn khi võ đạo đỉnh phong, linh đạo đạt đến cực hạn có thể phá toái hư không. Lục Thiếu Du mang theo ký ức từ kiếp trước tái sinh, không cam lòng làm một thiếu gia chẳng khác gì củi mục.",
        categories: ["Tiên hiệp"]
    },
    {
        id: 4,
        title: "Sắc Xuân Gửi Người Tình",
        author: "Xá Mục Tư",
        img: book4,
        chapters: 11,
        description: "– Trang Khiết này, anh làm người tình của em nhé.\n \ – Hả?\n \ – Anh – Trần Mạch Đông\n \ – chấp nhận sa ngã làm người tình của em. Đây là câu chuyện viết về tình yêu của một cặp trai gái không nên nết. Về tình bạn “tao sẽ yêu mày 60 năm”.",
        categories: ["Ngôn tình"]
    },
    {
        id: 5,
        title: "Đức Dương Quận Chúa",
        author: "Thâm Hải Lý Đích Vân Đóa",
        img: book5,
        chapters: 156,
        description: "Bạn đang đọc truyện Đức Dương Quận Chúa của tác giả Thâm Hải Lý Đích Vân Đóa. Nàng tên Ân Trường Hoan, là quận chúa Đức Dương, sinh ra là một cái mỹ nhân, quyến rũ động lòng người, nhận được ngàn vạn sủng ái.\n \ Mặc dù chỉ là quận chúa nhưng vẫn có thể sống thoải mái tiêu dao, lại còn muốn gì được dó, chính là vì có Thái Hậu ngoại tổ mẫu làm chỗ dựa, hết mực cưng chiều nàng. \n \ Nhưng biến cố bỗng nhiên dồn dập tới, Thái Hậu hoăng, mà sau đó chính là vị hôn phu bội ước.\n \ Nàng cũng thất vọng buồn lòng, nghĩ.\n \ Nàng mở mắt ra lần nữa, mơ mơ màng màng, nhận ra mình được trời cao thương xót, cho trọng sinh trở về. Nàng trước tiên dĩ nhiên chính là cứu ngoại tổ mẫu của mình, sau đó.....Cáo trạng!! Sau khi từ hôn.\n \ Lời nói của Thái Hậu thấm thía: Trường Hoan à, cháu muốn quận mã thế nào?",
        categories: ["Ngôn tình"]
    },
];

const trendingNovel = () => {
    const [urls, setUrls] = useState([]);

    useEffect(() => {
    const generateSlugs = async () => {
      const slugs = await Promise.all(novelData.map(novel => slugify(novel.title)));
      setUrls(slugs);
    };
    generateSlugs();},
    []);
  return (
        <div className='container w-10/12 mx-auto'>
            <div className='font-semibold text-center mt-10 mb-10 ml-20 flex justify-start mx-auto'>
                <p className="text-3xl">Truyện Hot
                <i class="fi fi-bs-arrow-trend-up ml-5 text-3xl"></i>
                </p>
            </div>
            {/*Cards*/}
            <div>
                <div className='ml-20 grid grid-cols-2 sm:grid-cols-5 gap-3'>
                    {
                        novelData.map((novel)=>(
                            <a href={`/${slugify(novel.title)}`} className='mb-5 cursor-pointer'>
                                <img src={novel.img} alt="Novel Image" className='w-[129px] h-[192px] object-cover rounded-md'/>
                                <div className='align-center'>
                                    <p className='font-semibold'>{novel.title}</p>
                                    <p className='text-md'>{novel.author}</p>
                                </div>
                            </a>
                        ))
                    }
                </div>
            </div>
           
        </div>
  )
}

export default trendingNovel;