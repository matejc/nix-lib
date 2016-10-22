{ ... }:
{
    boot = {
        blacklistedKernelModules = ["snd_pcsp"
            "pcspkr"
        ];
        extraModprobeConfig = "options snd_hda_intel index=1,0\n";
        initrd = {
            availableKernelModules = ["xhci_pci"
                "ehci_pci"
                "ahci"
                "usb_storage"
                "sd_mod"
                "rtsx_pci_sdmmc"
            ];
            kernelModules = ["dm-crypt"
                "ext4"
                "ecb"
                "tun"
                "kvm-intel"
                "dm_mod"
            ];
            luks = {
                devices = [{
                    allowDiscards = true;
                    device = "/dev/sda2";
                    name = "lvm_pool1";
                }];
            };
        };
        kernelModules = ["dm-crypt"
            "ext4"
            "ecb"
            "tun"
            "kvm-intel"
            "dm_mod"
        ];
        kernelPackages = {
            accelio = "<error>";
            acpi_call = "<drv>/nix/store/vbfcpznbpykm26c5w8k3223zdwhlgqnz-acpi-call-4.5.5</drv>";
            ati_drivers_x11 = "<drv>/nix/store/82jrbh4jv5k6h41mvravyk9hdiipwai8-ati-drivers-15.12-4.5.5</drv>";
            batman_adv = "<drv>/nix/store/8zblj5w63lawlpcqppc5r1czq5b0jyll-batman-adv-2016.1-4.5.5</drv>";
            bbswitch = "<drv>/nix/store/719fg2rqs3hx9jcrly54ay0qn7r6za5f-bbswitch-0.8-4.5.5</drv>";
            bcc = "<drv>/nix/store/0jnrqv752c0las57f5bb20fkqmbxllg2-bcc-git-2016-05-18</drv>";
            blcr = "<error>";
            broadcom_sta = "<drv>/nix/store/r94c9gmj6sqcb3ddvbxan0jw64kwnbr7-broadcom-sta-6.30.223.248-4.5.5</drv>";
            cpupower = "<drv>/nix/store/b90pz29d2hzjzk8kqfj7jlah8pgdr2pv-cpupower-4.5.5</drv>";
            cryptodev = "<drv>/nix/store/1n4ph0k1zv5d6nhdrlmyn9gg2h9wl19r-cryptodev-linux-1.6-4.5.5</drv>";
            dpdk = "<drv>/nix/store/mqyfya66dddmv7sacx3b03842h27pshi-dpdk-16.04-4.5.5</drv>";
            e1000e = "<drv>/nix/store/rqkpljzmxxcv2k6amry9dvghxs4v4aw5-e1000e-3.3.1-4.5.5</drv>";
            facetimehd = "<drv>/nix/store/0k1mlhdclzqilpnjlhmcsd03ikn50fc8-facetimehd-git-20160503-4.5.5</drv>";
            frandom = "<drv>/nix/store/0knkpgipyyi97fal2lc17g5n98wgjfj2-frandom-1.1-4.5.5</drv>";
            fusionio-vsl = "<drv>/nix/store/i09a3csfh81y88b4f8cp0p7nrzd9932g-fusionio-iomemory-vsl-3.2.10</drv>";
            jool = "<error>";
            kernel = "<drv>/nix/store/6sl92wqpcbsd8npfxp0dyndbi2zz6sij-linux-4.5.5</drv>";
            lttng-modules = "<drv>/nix/store/l0ybcghx5v940na39ya93brrqbz8nsx1-lttng-modules-2.6.3-4.5.5</drv>";
            mba6x_bl = "<drv>/nix/store/vljwp6s4ki4g2iy33swhwiamzxmvafqw-mba6x_bl-2016-02-12</drv>";
            mxu11x0 = "<drv>/nix/store/4p54x15g3ksvzkks7270fadl1fz3c4c1-mxu11x0-1.3.11-4.5.5</drv>";
            ndiswrapper = "<drv>/nix/store/mn2sbfwjfhwfnm1ggwfz2qv9v3fy6wiv-ndiswrapper-1.59-4.5.5</drv>";
            netatop = "<drv>/nix/store/hrn785q81is0z52w0azyj9ba3wdpl0yz-netatop-4.5.5-0.7</drv>";
            nvidia_x11 = "<drv>/nix/store/7hj1dcjl2cbgg7mpanf7rmq433klmf5n-nvidia-x11-361.42-4.5.5</drv>";
            nvidia_x11_beta = "<drv>/nix/store/7hj1dcjl2cbgg7mpanf7rmq433klmf5n-nvidia-x11-361.42-4.5.5</drv>";
            nvidia_x11_legacy173 = "<drv>/nix/store/c2yq7ah8wlgy4dkwbgr2prlfzpwpmd92-nvidia-x11-173.14.39-4.5.5</drv>";
            nvidia_x11_legacy304 = "<drv>/nix/store/0vfdynlk0cs0vslmccy5qbwrnw374kd2-nvidia-x11-304.131-4.5.5</drv>";
            nvidia_x11_legacy340 = "<drv>/nix/store/h5v89s22rskqycnhvfc9jrb34qiswjr8-nvidia-x11-340.96-4.5.5</drv>";
            nvidiabl = "<drv>/nix/store/8770wqmhax1pw5l1h325fz8kkv1b49lp-nvidiabl-0.85-4.5.5</drv>";
            openafsClient = "<error>";
            perf = "<drv>/nix/store/ypymka7n3plryh723iyfvv4j43ffriyg-perf-linux-4.5.5</drv>";
            phc-intel = "<drv>/nix/store/7nwns4kd19mfmvfx8s2zx23h41s98vxw-linux-phc-intel-0.4.0-rev19-4.5.5</drv>";
            prl-tools = "<drv>/nix/store/s04bdkhn547bx545sy540kb06321ijjf-prl-tools-10.0.2.27712</drv>";
            psmouse_alps = "<error>";
            recurseForDerivations = true;
            rtl8723bs = "<drv>/nix/store/fwywr2jknp3xd9xvwdbc3844gvl07ri5-rtl8723bs-4.5.5-6918e9b2ff297b1cc7fde193e72452c33c10e1c8</drv>";
            rtl8812au = "<drv>/nix/store/54vflbxildcsvchcjj3bd39zk34h4lkc-rtl8812au-4.5.5-4.2.2-1</drv>";
            seturgent = "<drv>/nix/store/wfj271g0zx87gk28w8gcm3pk2cqkcm8y-seturgent-2012-08-17</drv>";
            spl = "<drv>/nix/store/z28d4hjmk8nn3dgb36762dwhddfyc8w5-spl-kernel-0.6.5.7-4.5.5</drv>";
            sysdig = "<drv>/nix/store/bywdl62jrxid7lg3q4k51fhli18vaf4m-sysdig-0.9.0</drv>";
            tp_smapi = "<drv>/nix/store/xya19srs2xf83yr3phrw6b3xabm5k7cd-tp_smapi-0.42-4.5.5</drv>";
            v4l2loopback = "<drv>/nix/store/miggg3sjjm3jvsllclhampshvkzdxsj0-v4l2loopback-0.9.1-4.5.5</drv>";
            v86d = "<drv>/nix/store/7z20dbznnqg0i9vqalb2lvw6afbb9bcj-v86d-0.1.10-4.5.5</drv>";
            vhba = "<drv>/nix/store/8rjijh7p9kwsc7y0rbw6mqskaa591bag-vhba-20140928</drv>";
            virtualbox = "<drv>/nix/store/q64sfbsxcfjsss2njzxbvymjhipcbph4-virtualbox-5.0.20-4.5.5</drv>";
            virtualboxGuestAdditions = "<drv>/nix/store/i47336d5yn5hk06nkdjq45h8sq43ipl7-VirtualBox-GuestAdditions-5.0.20-4.5.5</drv>";
            virtualboxHardened = "<drv>/nix/store/6av39zpsddjpjiq7xv3nknnq3yx7qd32-virtualbox-5.0.20-4.5.5</drv>";
            x86_energy_perf_policy = "<drv>/nix/store/lpac9gnr5fgsmpi6kr9mncn8wqdgr6fg-x86_energy_perf_policy-4.5.5</drv>";
            zfs = "<drv>/nix/store/smvz9n9syfvf194ngxf23k7vgr467k6s-zfs-kernel-0.6.5.7-4.5.5</drv>";
        };
        kernelParams = ["libata.force=noncqtrim,noncq"];
        loader = {
            grub = {
                device = "/dev/sda";
                enable = true;
                version = 2;
            };
        };
    };
    environment = {
        interactiveShellInit = "export PATH=$HOME/bin:$PATH\nexport EDITOR=\"vim\"\n";
        pathsToLink = ["/"];
        systemPackages = ["<drv>/nix/store/d3illnr3mr7p1kc3bhf46gzs0fywg25d-file-5.25</drv>"
            "<drv>/nix/store/glid1av340032qf3kqzhccaa8z8vmnc5-gnupg-2.1.12</drv>"
            "<drv>/nix/store/4cfj8qmvxlv6icnilczwc7v6wmywddqw-gnupg1compat-0</drv>"
            "<drv>/nix/store/si75870gl8wnnrglp9gjhqbf6q14xm3q-nmap-7.01</drv>"
            "<drv>/nix/store/q3kq69gvy20i5pfqdcisicphz43jfzb0-p7zip-15.14.1</drv>"
            "<drv>/nix/store/rjk7phfqq0yllaxjnssaa6jz2wdf5nqz-zip-3.0</drv>"
            "<drv>/nix/store/75xhaj1wmxmxrwm8l9zip4g66swagwg3-unzip-6.0</drv>"
            "<drv>/nix/store/3kk2warvdnv07df6159cijz7as43w1i3-htop-2.0.1</drv>"
            "<drv>/nix/store/dqxby753bnhvx1x7c5a33gwkyb50n1hb-powertop-2.8</drv>"
            "<drv>/nix/store/k4z6h4pyc61y6w19gm3dydnyixn3hxbx-pwgen-2.07</drv>"
            "<drv>/nix/store/y5md3mmbl09xmgs1qj2xrhhaxnhrq1h5-tmux-2.2</drv>"
            "<drv>/nix/store/shmx74n20i6ih89wmxmwvk3s1xl7jxmn-std-man-pages-4.4.0</drv>"
            "<drv>/nix/store/hla33j1jqblyy29hmrcgvas255mfjac1-telnet-1.2</drv>"
            "<drv>/nix/store/d3irl1yrgzc3d5yii60pl57grqfyb2vg-unrar-5.3.11</drv>"
            "<drv>/nix/store/75xhaj1wmxmxrwm8l9zip4g66swagwg3-unzip-6.0</drv>"
            "<drv>/nix/store/r80ldjas9rg3ry4kif1gz5i37p4gf4vl-wget-1.17.1</drv>"
            "<drv>/nix/store/rwi3s4m8bzzppnqmb3inwj9jvirwwmwg-w3m-0.5.3-2015-12-20</drv>"
            "<drv>/nix/store/p7cn4rd7rkc4x0g3354aj5ynh90pfcv2-bash-4.3-p42</drv>"
            "<drv>/nix/store/wpfg9lcbb0a9m3iap3sklgnwqan1q368-zsh-5.2</drv>"
            "<drv>/nix/store/0ai5sdixqk9n6rzrs3wwyfliv7rpgfha-git-2.8.3</drv>"
            "<drv>/nix/store/1zhdd8sq1887jr29nj8dfylxxjyjidh3-hub-2.2.3</drv>"
            "<drv>/nix/store/ldfq0cpqhj6rm31diw61n91nff7kfjcq-gettext-0.19.7</drv>"
            "<drv>/nix/store/ci6c8p3vs4gac9bdnm53y8c3m9jixk89-lsof-4.89</drv>"
            "<drv>/nix/store/hj7s4cbk9gkmddsjijbi6bqywcplv52f-stdenv</drv>"
            "<drv>/nix/store/qwrnkim9w1vmn2xi2xhws13yp7nj2x6j-xfontsel-1.0.5</drv>"
            "<drv>/nix/store/d37j4sf8sclfb7lml3g7s7nl9272ncym-xev-1.2.2</drv>"
            "<drv>/nix/store/q7wfw6x44ql650mi45f5sr3apjlg4cmx-xmessage-1.0.4</drv>"
            "<drv>/nix/store/c68p6xd6kq3p203f3j4vb593kxi63ff1-xmodmap-1.0.9</drv>"
            "<drv>/nix/store/4pbh70xkv1xqb3cl4y6l6mw2idxp8xcs-rxvt-unicode-with-perl-with-unicode3-9.22</drv>"
            "<drv>/nix/store/34nqfz7vdsc03786pqx0awxn442xwi3x-xsel-1.2.0</drv>"
            "<drv>/nix/store/0nrca2qz7n4yp498qpkkym1shm0jq11r-vim_configurable-7.4.826</drv>"
            "<drv>/nix/store/pd97vppb5qz11xba8c9cz0628xgr2xl6-tree-1.7.0</drv>"
            "<drv>/nix/store/4kg4g2gbfn3v2m7azv7w925cgrgwkyjv-firefox-46.0.1</drv>"
            "<drv>/nix/store/x7ncskxkhmj8hc1qqmz2p8ksxpzybhns-chromium-51.0.2704.63</drv>"
            "<drv>/nix/store/abhp4rmiiq7a5722y12kqwsr85qyzlf6-evince-3.18.2</drv>"
            "<drv>/nix/store/s5r1dlf8iszaglz0za3fk4wbld6mrwb9-vlc-2.2.3</drv>"
            "<drv>/nix/store/nmv480chl0cwwlgi331ipssb5fv4c14g-mpv-0.17.0</drv>"
            "<drv>/nix/store/0q10ya78myy0svgkbi0cv4381l9mhrwz-wgetpaste-2.25</drv>"
            "<drv>/nix/store/jwaxnrk1p4lfrxld0d57wsrjxgsxyghi-gparted-0.26.0</drv>"
            "<drv>/nix/store/2sn8yjzvd6678hvdv2qmc07jrnd3hj74-unetbootin-613</drv>"
            "<drv>/nix/store/9dvsh14f22p6lfmbhnylad3qg0mzrlns-xautolock-2.2</drv>"
            "<drv>/nix/store/zcvfnrp42bhs5fvyzya0j2clma2b10n7-i3lock-2.7</drv>"
            "<drv>/nix/store/wyw13z263asjbpd29g36h5j027fpqgp0-i3status-2.10</drv>"
            "<drv>/nix/store/4xhc7n5f5slmfqgvlnw8hsq7bws1if4b-scrot-0.8-17</drv>"
            "<drv>/nix/store/g4sz4zz8crbah41xiwf2dy9m3sad7sjg-vifm-0.8</drv>"
            "<drv>/nix/store/rxld6jfa825hzsgn70gppv6djgh7v2iw-imagemagick-6.9.3-9-dev</drv>"
            "<drv>/nix/store/l5fnd5g52zrfd2hn4c082pc8jmlychm5-python-2.7.11</drv>"
            "<drv>/nix/store/3fwsbac9cjvhx2hxxppyc41x29gqxry6-python2.7-virtualenv-13.1.2</drv>"
            "<drv>/nix/store/g6l5dvfchpimbw1wj02xa5g5g2dscn5v-python2.7-ipython-4.1.2</drv>"
            "<drv>/nix/store/3azi2rzcylpdzmhy9swpa0v5xqa37dcs-feh-2.15.4</drv>"
            "<drv>/nix/store/yifx6ysapl6w5va0vczh60w3nw7lpa6g-bind-9.10.4-dev</drv>"
            "<drv>/nix/store/gijkyjyrv08bn7r48n5aiv0bblfl9vhv-psmisc-22.21</drv>"
            "<drv>/nix/store/bbbsw2bj0yspd1mzj8lhs15gncxdhxdh-upower-0.99.4</drv>"
            "<drv>/nix/store/axh39b677xc4paw0q1ac8q9l2qgpjqqg-pm-utils-1.4.1</drv>"
            "<drv>/nix/store/7r6p63w6afpk0rdwbjwyj3x9vq61pqxd-gtk-engine-murrine-0.98.2</drv>"
            "<drv>/nix/store/pwsm883wqckdlmvlgw89l9pfh3albzb6-gtk-engines-2.20.2</drv>"
            "<drv>/nix/store/6vn6pp2nyv5grh71w9lw3yfh113dx2yl-arc-gtk-theme-git-2016-05-14</drv>"
            "<drv>/nix/store/hzkvnz9yglzkp5d9k8fyz9zdywkhar94-atom-1.7.3</drv>"
            "<drv>/nix/store/1hpmiq8y2fzcsvs5428nfsgrcx63vbhq-sublimetext3-3114</drv>"
            "<drv>/nix/store/zg29xgvsylfg1s3qp6v3jng3rzshjqhn-cmst-2016.01.28</drv>"
            "<drv>/nix/store/hgf4r7008xb23xsdkjw7m5f8if3s4dmc-bindfs-1.12.6</drv>"
            "<drv>/nix/store/irflwmnasgmqhbyr156crlvaa5mf5nzk-ncdu-1.11</drv>"
            "<drv>/nix/store/b1sc3wgpgpipz2xxnx3m08hy762ay6hi-python2.7-tarman-0.1.3</drv>"
            "<drv>/nix/store/gs78ax7cyg0f0p0zdsf2aymyl6q7r9z2-nixmy</drv>"
            "<drv>/nix/store/8297nwpp1gc0dibz9y1laqrm8kip8903-dmenu-4.6</drv>"
            "<drv>/nix/store/w5lw7n0qs6rlx027cqjg9q1pf2z13bqp-xclip-0.12-svn-20140209</drv>"
            "<drv>/nix/store/ab6hxzgwqkw12s94vr2qc026ws9bvbfn-twmn-git-2014-09-23</drv>"
            "<drv>/nix/store/pvhhyy8sjbs25x38dl2x0z9v0940il0l-i3minator-0.0.4</drv>"
            "<drv>/nix/store/m4czqhs6dk2xw8bkp4zigfk8gnnqg6hx-xcompmgr-1.1.7</drv>"
            "<drv>/nix/store/yk6awz1cf9qqgiwdi05mz8q9l4m1p0ds-which-2.21</drv>"
            "<drv>/nix/store/qlhpy40b17a9ki0djcj58zkgx0g4llqj-nodejs-4.4.4</drv>"
            "<drv>/nix/store/v9wv26x56h2ca5x9ii19m78ayb86hqzs-gnumake-4.1</drv>"
            "<drv>/nix/store/q40hg9lgl6w30nq5ki0p22bxb23pjc72-shared-mime-info-1.5</drv>"
            "<drv>/nix/store/w2nzmz6qwlssl6giw93adi7v6laa8by5-tango-icon-theme-0.8.90</drv>"
            "<drv>/nix/store/s7f8ip67vhdkpjdz0kg20gffn82mpvgd-xbacklight-1.2.1</drv>"
            "<drv>/nix/store/za8j86x113jkdr1rklpycs2kpkxyck07-hicolor-icon-theme-0.15</drv>"
            "<drv>/nix/store/4g4xgdm025l0wf4is5ywjcwqrdlxryg0-lynx-2.8.8rel.2</drv>"
            "<drv>/nix/store/dpbyjas0iksg2fz95cm1i1xrcx333hkj-inetutils-1.9.4</drv>"
            "<drv>/nix/store/9dsb1k8hg4h7mvqgk91cnsbf2l336xb3-xarchiver-0.5.4</drv>"
            "<drv>/nix/store/gdmh1wpkl42i392nakvcsq31n75hhkxg-orion-1.5</drv>"
            "<drv>/nix/store/4xc1p40inqmnk4avfjk298zhk8lbl7fn-tcpdump-4.7.4</drv>"
            "<drv>/nix/store/hhbsznkymrdnbismdr4wxws9xmh7prls-spacefm-1.0.5</drv>"
            "<drv>/nix/store/ql7icjminzm13sm2zg8daqfad9dai9gq-xkill-1.0.4</drv>"
            "<drv>/nix/store/6pv9d6m2dxngk2k0qi2gga16gvf6fjg1-sshfs-fuse-2.7</drv>"
            "<drv>/nix/store/zb4y82dwbqv5flr4zw1ndn6gkvhfvq0m-gpicview-0.2.4</drv>"
            "<drv>/nix/store/4yn562yp6fc021x01gi9xgkxs9xy6m5s-xfce4-terminal-0.6.3</drv>"
            "<drv>/nix/store/39iajwflxqsf557sjb1c70pfjs4ny4gk-go1.5-mongo-tools-4fcfd3e-bin</drv>"
            "<drv>/nix/store/x0ifyrbk8xw825fm49iijmmkrhiam77q-thunderbird-45.1.0</drv>"
            "<drv>/nix/store/7ykyqj0g9mq6njfd09nvf07sgjjp02sw-mplayer-1.1.1</drv>"
            "<drv>/nix/store/nmv480chl0cwwlgi331ipssb5fv4c14g-mpv-0.17.0</drv>"
            "<drv>/nix/store/0z7rf3l2rvrv8dbf1xngyd3m1dkvwb3g-qtgraphicaleffects-5.6.0-dev</drv>"
            "<drv>/nix/store/x5ah1r8p5nk04z8d6s9jb6194nix0bdn-xfce4-screenshooter-1.8.2</drv>"
            "<drv>/nix/store/dqrp378035k8zq81ldlvk5gf147zf5a0-kate-16.04.1-dev</drv>"
            "<drv>/nix/store/8vllq7rjy4cn20ldfxg456rnkisz2cnd-ctags-816</drv>"
            "<drv>/nix/store/pwjwxaancjh4rz97bkhd5n1wa7zpwhdl-pciutils-3.5.1</drv>"
            "<drv>/nix/store/bg6hdazs9pgrxppwsfx5psd1k816zhrr-usbutils-008</drv>"
            "<drv>/nix/store/dwy67kwplf35pp5xrbg31nqgwazbvbv5-terminology-0.9.1</drv>"
            "<drv>/nix/store/944sdinv4mvyn2ndgjc8y0254mdi3dgi-git-new-workdir</drv>"
            "<drv>/nix/store/63ryg52vxj9z85gbw7yaw8xsswqhf00p-libappindicator-gtk2-12.10.0</drv>"
            "<drv>/nix/store/4l9d85zapa3djv7514rcwjkxwjkdv1bc-libappindicator-gtk3-12.10.0</drv>"
        ];
    };
    fonts = {
        fonts = ["<drv>/nix/store/g7lwji3jnjm29ldqhclvwsbbiarvw6q2-cantarell-fonts-0.0.24</drv>"
            "<drv>/nix/store/azsa7cs8ghvhx8jv04swmq9v5pclghfd-powerline-fonts-2015-12-11</drv>"
        ];
    };
    hardware = {
        enableAllFirmware = true;
        firmware = ["<drv>/nix/store/00wb0cymzldaihqh33bmhpp25fy5xa38-myFirmware-3</drv>"];
        opengl = {
            extraPackages = ["<drv>/nix/store/zssh6j63qwgy5gypb62cxp83jpf1nkdr-libva-intel-driver-1.7.0</drv>"];
        };
        pulseaudio = {
            enable = true;
        };
    };
    i18n = {
        consoleFont = "lat9w-16";
        consoleKeyMap = "us";
        defaultLocale = "en_GB.utf8";
    };
    networking = {
        connman = {
            enable = true;
        };
        enableIPv6 = false;
        firewall = {
            allowPing = true;
            allowedTCPPorts = [2222];
            allowedUDPPorts = [];
            enable = true;
        };
        hostName = "test1";
        nameservers = ["8.8.8.8"
            "8.8.4.4"
        ];
        networkmanager = {
            enable = false;
        };
        supplicant = {
            wlp3s0 = {
                configFile = {
                    path = "/etc/wpa_supplicant.conf";
                };
                extraCmdArgs = "-u";
                userControlled = {
                    group = "networkmanager";
                };
            };
        };
        wireless = {
            enable = true;
        };
    };
    nix = {
        binaryCaches = ["https://cache.nixos.org/"];
        trustedBinaryCaches = ["https://cache.nixos.org/"];
    };
    nixpkgs = {
        config = {
            allowUnfree = true;
            chromium = {
                enablePepperFlash = true;
            };
            firefox = {
                enablePepperFlash = false;
            };
            rxvt_unicode = {
                perlBindings = true;
            };
        };
    };
    powerManagement = {
        enable = true;
        scsiLinkPolicy = "max_performance";
    };
    programs = {
        ssh = {
            forwardX11 = false;
        };
        zsh = {
            enable = true;
            interactiveShellInit = "compctl -k \"(profile log rebuild revision update nix-env nox)\" nixmy\n";
        };
    };
    security = {
        polkit = {
            enable = true;
            extraConfig = "polkit.addRule(function(action, subject) {\n  if ((action.id == \"org.freedesktop.udisks2.filesystem-mount-system\" ||\n    action.id == \"org.freedesktop.udisks2.filesystem-mount\") &&\n    subject.isInGroup(\"wheel\")) {\n    return polkit.Result.YES;\n  }\n});\n";
        };
        sudo = {
            enable = true;
        };
    };
    services = {
        acpid = {
            enable = true;
        };
        locate = {
            enable = false;
        };
        mongodb = {
            enable = true;
        };
        nixosManual = {
            showManual = true;
        };
        openssh = {
            enable = true;
            permitRootLogin = "no";
        };
        printing = {
            enable = true;
        };
        udisks2 = {
            enable = true;
        };
        xserver = {
            autorun = true;
            desktopManager = {
                default = "Enlightenment";
                enlightenment = {
                    enable = true;
                };
                kde5 = {
                    enable = false;
                };
            };
            displayManager = {
                lightdm = {
                    enable = true;
                };
                slim = {
                    enable = false;
                };
            };
            enable = true;
            exportConfiguration = true;
            layout = "us";
            synaptics = {
                enable = true;
                maxSpeed = "0.95";
                tapButtons = false;
                twoFingerScroll = true;
            };
            videoDrivers = ["intel"];
            windowManager = {
                default = "none";
                i3 = {
                    enable = false;
                };
            };
            xkbOptions = "eurosign:e";
        };
    };
    sound = {
        enable = true;
        enableMediaKeys = false;
    };
    time = {
        timeZone = "Europe/Ljubljana";
    };
    users = {
        extraUsers = {
            sheep = {
                extraGroups = ["wheel"
                    "networkmanager"
                    "docker"
                    "libvirtd"
                    "vboxusers"
                ];
                group = "users";
                isNormalUser = true;
                shell = "/run/current-system/sw/bin/zsh";
                uid = 1000;
            };
        };
    };
    virtualisation = {
        docker = {
            enable = true;
            extraOptions = "-H unix:///var/run/docker.sock --dns 8.8.8.8 --dns 8.8.4.4\n";
            socketActivation = false;
            storageDriver = "devicemapper";
        };
        virtualbox = {
            host = {
                enable = true;
            };
        };
    };
}
