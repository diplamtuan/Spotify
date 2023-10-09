export function loadAboutUs() {
    const body = document.querySelector('.content-body');
    let html = " ";
    html += `
    <div class="content-about-us">
    <h2 class="about-us-title">Our Story</h2>
    <p class="about-us-name">Welcome to my Clone Spotify</p>
    <img class="about-us-img"
        src="https://scontent.fsgn5-2.fna.fbcdn.net/v/t39.30808-6/364774780_1733033167142017_4197371212770652663_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=6wjJVtI-e-cAX836gYC&_nc_ht=scontent.fsgn5-2.fna&oh=00_AfC4i-OfOvubGlUe-tPEcPn9MvYkW3a3bnyMm_-c2oCldw&oe=64F9EAAA"
        alt="">
    <p class="about-us-desc">"Spotify là nền tảng âm nhạc vô cùng đa dạng và tương tác, mang đến cho
        hàng
        triệu người trên khắp
        thế giới những trải nghiệm âm nhạc độc đáo và cá nhân hóa. Với Spotify, bạn có thể dễ dàng khám
        phá
        và thưởng thức hàng triệu bài hát, album và danh sách phát từ mọi thể loại âm nhạc imaginable.
        Tính
        năng tìm kiếm thông minh của Spotify giúp bạn tìm thấy những bản nhạc mà bạn yêu thích hoặc khám
        phá
        những bài hát mới mẻ dựa trên sở thích của bạn.

        Như một cá nhân yêu âm nhạc đam mê, tôi đã tạo ra một trang cá nhân trên Spotify, giúp tôi tạo
        ra
        những danh sách phát cá nhân hóa dựa trên tâm trạng, hoạt động và sở thích của mình. Spotify
        cũng
        cung cấp tính năng 'Discover Weekly' và 'Release Radar', giúp tôi luôn cập nhật với những bản
        nhạc
        mới nhất từ các nghệ sĩ mà tôi yêu thích.

        Không chỉ thế, Spotify còn cho phép tôi chia sẻ âm nhạc yêu thích của mình với bạn bè thông qua
        tính
        năng chia sẻ danh sách phát và bài hát trên các mạng xã hội. Điều này giúp tôi kết nối với những
        người có cùng sở thích âm nhạc và tạo ra những trải nghiệm âm nhạc thú vị cùng nhau.

        Với Spotify, âm nhạc không chỉ là một phần cuộc sống của tôi mà còn là một cách để tôi thể hiện
        cá
        nhân và kết nối với cộng đồng âm nhạc rộng lớn. Tôi hy vọng rằng bạn cũng sẽ cảm thấy như vậy
        khi
        khám phá Spotify cùng chúng tôi."</p>
</div>
    `
    html += `
    <div div id = "footer" >
    <div class="footer-top">
        <div class="footer-col">
            <h4>Company</h4>
            <p class="AboutUsLink">About</p>
            <p>Jobs</p>
            <p>For the Record</p>
        </div>
        <div class="footer-col">
            <h4>Communities</h4>
            <p>For Artists</p>
            <p>Developers</p>
            <p>Advertising</p>
            <p>Investors</p>
            <p>Vendors</p>
        </div>
        <div class="footer-col">
            <h4>Useful links</h4>
            <p>Support</p>
            <p>Free Mobile App</p>
        </div>
        <div class="footer-col footer-col-2">
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-facebook"></i>
        </div>
    </div>
    <hr class="separate-footer">
    <div class="footer-bottom">
        <div class="footer-bottom-left">
            <a href="#">Legal</a>
            <a href="#">Privacy Center</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Cookies</a>
            <a href="#">About Ads</a>
            <a href="#">Accessibility</a>
        </div>
        <div class="footer-bottom-right">
            <span>© 2023 Spotify AB</span>
        </div>
    </div>
</div>
    `;
    console.log(html)
    body.innerHTML = html;
}