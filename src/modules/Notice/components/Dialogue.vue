<template>
  <section class="dialogue-container">
    <article class="dialogue-nav">
      <header class="dialogue-nav__header nav-cur">
        <div class="left">
          <img v-if="userInfo.photo" :src="userInfo.photo" alt="" />
          <img v-else src="@/assets/images/navigation-avatar.webp" alt="" />
          <span class="nowrap">{{ userInfo.userName }}</span>
        </div>
        <div class="right"></div>
      </header>
      <ul class="dialogue-nav__list">
        <li
          v-for="([key, ev], i) in Object.entries(navData)"
          :key="i"
          :class="`${curKey == key ? 'nav-cur' : ''}`"
          @click="handleChange(key, ev)"
        >
          <div class="left">
            <img src="@/assets/images/navigation-avatar.webp" alt="" />
          </div>
          <div class="right">
            <figcaption>
              <span>{{ key }}</span>
            </figcaption>
            <figcaption
              class="nowrap"
              style="font-size: 12px; color: rgba(255, 255, 255, 0.8)"
              v-html="decodeURI(ev[ev.length - 1]?.message || '暂无聊天数据')"
            />
          </div>
        </li>
      </ul>
    </article>
    <article
      class="dialogue-con"
      v-loading="loading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <header v-if="curKey" header class="dialogue-con__header">
        {{ curKey }}
      </header>
      <figure v-if="curKey" header class="dialogue-con__content">
        <article v-for="(item, i) in curList" :key="i">
          <p class="other" v-if="item.formUserId !== userInfo.userName">
            <img src="@/assets/images/navigation-avatar.webp" alt="" />
            <span v-html="decodeURI(item.message)" />
          </p>
          <p class="self" v-else>
            <span v-html="decodeURI(item.message)" />
            <img v-if="userInfo.photo" :src="userInfo.photo" alt="" />
            <img v-else src="@/assets/images/navigation-avatar.webp" alt="" />
          </p>
        </article>
      </figure>
      <div v-if="curKey" header class="dialogue-con__footer">
        <div class="options">
          <nav v-for="(item, i) in dialogueOptions" :key="i">
            <TooltipCustom v-if="item.key == 1" placement="top" :content="`${item.text}`">
              <el-popover transition="el-fade-in-linear" placement="top" :width="400" trigger="click">
                <template #reference>
                  <span
                    @click="createFocus"
                    style="padding-right: 6px"
                    v-html="
                      `<svg t='1653024126146' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='14732' width='24' height='24'>
                          ${item.svg}
                        </svg>`
                    "
                  />
                </template>
                <DialogueExpression />
              </el-popover>
            </TooltipCustom>
            <TooltipCustom v-else placement="top" :content="`${item.text}`">
              <el-upload
                :action="getUploadUrl()"
                :on-success="uploadSuccess"
                :multiple="false"
                :headers="{
                  Authorization: 'Bearer ' + Cookies.get('token'),
                }"
                multiple
                :limit="1"
                :show-file-list="false"
              >
                <span
                  style="padding-right: 6px;margin-top:12px"
                  v-html="
                    `<svg t='1653024126146' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='14732' width='24' height='24'>
                          ${item.svg}
                        </svg>`
                  "
                />
              </el-upload>
            </TooltipCustom>
          </nav>
        </div>
        <article id="notice-textarea"></article>
      </div>

      <p class="empty" v-if="!curKey">
        <svg
          t="1653226830953"
          class="icon"
          viewBox="0 0 1549 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="18365"
          width="128"
          height="128"
        >
          <path
            d="M850.690188 401.084171a81.254838 81.254838 0 0 0-4.638632 2.783179 1.312821 1.312821 0 1 0 1.426598 2.205539c0.831453-0.542632 1.662906-1.050256 2.494359-1.549128-0.350085 1.92547-0.61265 3.798427-0.796445 5.618871a1.312821 1.312821 0 1 0 2.608137 0.271317c0.253812-2.433094 0.647658-4.962462 1.190291-7.579351a68.179145 68.179145 0 0 1 1.977983-1.015248 1.312821 1.312821 0 0 0-1.155282-2.354324l-1.724171 0.875213a1.312821 1.312821 0 0 0-1.382838 0.743932z m-69.308171 85.027008a1.312821 1.312821 0 1 1-2.258051-1.330324c1.496615-2.564376 3.001983-5.076239 4.489846-7.53559a1.312821 1.312821 0 0 1 2.249299 1.356581c-1.487863 2.450598-2.975726 4.953709-4.481094 7.509333z m9.075966-14.931145a1.312821 1.312821 0 0 1-2.223043-1.400342c1.592889-2.520615 3.177026-4.988718 4.75241-7.378051a1.312821 1.312821 0 0 1 2.188035 1.444103c-1.55788 2.380581-3.142017 4.822427-4.726154 7.33429z m9.601094-14.572308a1.312821 1.312821 0 0 1-2.153026-1.487863c1.697915-2.468103 3.395829-4.857436 5.07624-7.176752a1.312821 1.312821 0 1 1 2.126769 1.549128c-1.671658 2.29306-3.360821 4.673641-5.049983 7.115487z m10.283761-14.09094a1.312821 1.312821 0 1 1-2.074257-1.610393c1.837949-2.380581 3.675897-4.673641 5.496342-6.870427a1.312821 1.312821 0 0 1 2.012992 1.671658c-1.794188 2.179282-3.60588 4.446085-5.426325 6.80041z m11.176478-13.460786a1.312821 1.312821 0 0 1-1.960478-1.750427c2.030496-2.258051 4.043487-4.393573 6.038974-6.424069a1.312821 1.312821 0 0 1 1.872957 1.837949c-1.977983 2.004239-3.955966 4.113504-5.951453 6.336547z m12.191727-12.314256a1.312821 1.312821 0 1 1-1.75918-1.942975c2.275556-2.056752 4.524855-3.955966 6.765402-5.706393a1.312821 1.312821 0 0 1 1.619145 2.074256c-2.188034 1.706667-4.402325 3.570872-6.625367 5.575112z m29.57347-18.26571a1.312821 1.312821 0 0 1-0.787692-2.511863 48.90694 48.90694 0 0 1 8.795897-1.890462 1.312821 1.312821 0 1 1 0.315077 2.608137c-2.748171 0.323829-5.513846 0.918974-8.323282 1.794188z m16.559043-1.92547a1.312821 1.312821 0 0 1 0.227555-2.625641c1.444103 0.131282 2.888205 0.323829 4.314804 0.603898 1.662906 0.323829 3.168274 0.682667 4.621128 1.111521a1.312821 1.312821 0 0 1-0.726428 2.520615 49.27453 49.27453 0 0 0-4.393572-1.050256 39.437128 39.437128 0 0 0-4.043487-0.568889z m16.278974 4.848684a1.312821 1.312821 0 1 1 1.295316-2.29306c2.818188 1.592889 5.233778 3.48335 7.220513 5.645128a1.312821 1.312821 0 1 1-1.934222 1.776684 26.536479 26.536479 0 0 0-6.572855-5.128752z m10.992684 12.305504a1.312821 1.312821 0 1 1 2.468102-0.90147c1.067761 2.896957 1.55788 5.986462 1.479111 9.119727a1.312821 1.312821 0 0 1-2.625641-0.061265 21.836581 21.836581 0 0 0-1.31282-8.156992z m-0.77894 17.390496a1.312821 1.312821 0 1 1 2.406837 1.050256c-1.225299 2.800684-2.888205 5.408821-4.944957 7.710633a1.312821 1.312821 0 0 1-1.960479-1.750428c1.864205-2.100513 3.387077-4.46359 4.498599-7.010461z m-10.345026 11.929162a1.312821 1.312821 0 0 1 1.382837 2.231795c-2.58188 1.610393-5.426325 2.800684-8.454564 3.544616a1.312821 1.312821 0 0 1-0.612649-2.555624c2.748171-0.673915 5.338803-1.750427 7.684376-3.220787z m-16.979145 3.903453a1.312821 1.312821 0 1 1-0.210052 2.625641 38.25559 38.25559 0 0 1-8.874666-1.864205 1.312821 1.312821 0 0 1 0.831453-2.494359c2.809436 0.936479 5.575111 1.51412 8.262017 1.732923z m-16.50653-5.688889a1.312821 1.312821 0 0 1-1.496616 2.153026 26.13388 26.13388 0 0 1-6.537846-6.485333 1.312821 1.312821 0 1 1 2.144274-1.51412c1.592889 2.275556 3.553368 4.21853 5.890188 5.846427z m-9.697368-14.073436a1.312821 1.312821 0 1 1-2.529367 0.700171 40.802462 40.802462 0 0 1-1.374086-8.935931 1.312821 1.312821 0 0 1 2.625641-0.131282c0.140034 3.010735 0.568889 5.802667 1.277812 8.367042z m2.78318-34.299623a1.312821 1.312821 0 1 1-2.511864-0.787693c0.866462-2.730667 1.837949-5.513846 2.94947-8.340786a1.312821 1.312821 0 0 1 2.450599 0.962735c-1.085265 2.765675-2.048 5.496342-2.888205 8.165744z m5.995213-15.5613a1.312821 1.312821 0 0 1-2.398085-1.076512c1.190291-2.634393 2.468103-5.286291 3.833436-7.946941a1.312821 1.312821 0 0 1 2.33682 1.199043c-1.347829 2.625641-2.608137 5.233778-3.772171 7.82441z m8.051966-15.692581a1.312821 1.312821 0 1 1-2.275555-1.31282c1.452855-2.529368 2.975726-5.049983 4.551111-7.544342a1.312821 1.312821 0 0 1 2.21429 1.400342c-1.55788 2.468103-3.063248 4.953709-4.489846 7.45682z m9.469812-14.966154a1.312821 1.312821 0 0 1-2.161778-1.487863c1.68041-2.424342 3.413333-4.813675 5.172513-7.132991a1.312821 1.312821 0 1 1 2.100513 1.584136c-1.750427 2.301812-3.457094 4.647385-5.111248 7.036718z m10.502564-13.828376a1.312821 1.312821 0 1 1-2.030496-1.68041c1.907966-2.29306 3.842188-4.516103 5.785163-6.651624a1.312821 1.312821 0 1 1 1.942974 1.776684c-1.92547 2.100513-3.824684 4.288547-5.706393 6.55535z m12.007932-13.093196a1.312821 1.312821 0 0 1-1.837949-1.872958c2.17053-2.126769 4.349812-4.113504 6.51159-5.977709l0.201299-0.175043a1.312821 1.312821 0 0 1 1.697914 2.00424l-0.192547 0.16629c-2.118017 1.820444-4.253538 3.772171-6.380307 5.863932z m13.241983-11.692855a1.312821 1.312821 0 1 1-1.697915-2.004239l6.695385-5.645129a1.312821 1.312821 0 0 1 1.689162 2.012992c-2.17053 1.820444-4.402325 3.693402-6.686632 5.636376z m13.399521-11.237744a1.312821 1.312821 0 1 1-1.671658-2.012991c2.336821-1.942974 4.58612-3.798427 6.765402-5.575111a1.312821 1.312821 0 0 1 1.662906 2.039248c-2.17053 1.767932-4.419829 3.614632-6.75665 5.548854z m13.548308-11.045196a1.312821 1.312821 0 0 1-1.63665-2.048c2.406838-1.92547 4.699897-3.745915 6.87918-5.443829a1.312821 1.312821 0 0 1 1.610393 2.074256c-2.161778 1.689162-4.446085 3.500855-6.852923 5.417573z m-55.751111 133.496342a1.312821 1.312821 0 1 1-1.566633-2.100513 273.94188 273.94188 0 0 1 7.115487-5.163761 1.312821 1.312821 0 0 1 1.505368 2.144274c-2.135521 1.496615-4.481094 3.203282-7.04547 5.12z m43.428102-75.382154c0-2.82694 0.262564-4.62988 0.262564-4.62988 0.253812-1.286564 1.024-2.310564 2.310564-2.310565 20.304957-1.286564 36.767726 3.85094 49.362052 15.167453 22.125402 20.313709 22.89559 52.976684 22.895589 54.263248 0 0.770188-0.262564 1.277812-0.770188 1.794188a2.774427 2.774427 0 0 1-1.80294 0.770188c-67.111385-1.024-72.257641-50.140991-72.257641-65.054632z m8.769641 1.697914c-0.262564 10.800137 1.540376 59.400752 64.284445 61.711317-0.770188-7.964444-4.113504-32.391658-21.09265-47.821676-11.045197-10.029949-25.451214-14.659829-43.191795-13.889641z m18.116923 14.931146v0.008752a8.095726 8.095726 0 0 1-0.271316 1.050256c-0.393846 1.050256-3.877197 11.517812-7.255521 21.320205-0.026256 0.087521-3.649641-5.785162-3.614633-5.89894 2.818188-8.288274 5.811419-17.084171 6.135248-17.94188 0.131282-0.350085 0.420103-0.962735 0.787692-1.68041a446.621538 446.621538 0 0 0-13.915897-9.854906v-1.960479c4.148513-0.070017 6.275282-0.070017 6.38906 0a423.927248 423.927248 0 0 1 29.258393 22.090393c-0.061265-0.061265-0.087521-0.087521-0.078769-0.096273 3.010735-1.286564 6.949197-3.693402 10.108718-5.653881 0.131282-0.087521 4.892444 5.73265 4.787418 5.767658-1.881709 0.717675-5.846427 1.51412-10.598837 3.553368 8.454564 7.308034 16.480274 15.141197 22.090393 22.563008 0.052513 0.070017 0.306325 1.181538 0.761436 3.325812l1.619145 9.714872c-0.24506 0.472615-0.376342 0.665162-0.402598 0.595146-2.345573-7.526838-10.89641-17.206701-21.416479-26.842804 0.026256 0.035009 0.043761 0.061265 0.035009 0.070017l-4.323556 22.204171a80.257094 80.257094 0 0 1-4.979966-1.881709l4.752411-24.418462a365.97935 365.97935 0 0 0-19.867351-16.033914z m17.513026 7.132991c0.568889 0.577641 4.139761 3.60588 4.201026 3.579624h0.017504a295.997265 295.997265 0 0 0-4.21853-3.588376z m2.363077 8.900923c1.531624 1.330325 3.036991 2.678154 4.50735 4.025983a58.963145 58.963145 0 0 0-4.50735-4.034735z m-19.867351-16.033914a51.340034 51.340034 0 0 0-4.218529-3.15077v0.008753l4.209777 3.150769zM737.455043 507.238838l41.467624-14.799864 219.214769 41.660171-37.214086 29.16212zM784.541538 606.523077l-49.825914-17.381744-0.892718-78.690461 223.240752 57.75535z m-52.048957-96.063453l0.393846 78.252855-138.196239-48.941949zM566.788376 500.972308L712.056342 481.367521l19.94612 24.996103-137.916171 28.733265z m7.395556 41.345094l-1.024-0.743932v-0.131282zM771.675897 610.54906l-40.802461 66.428718L560.136752 583.583726l30.264889-38.596923z m8.156992 0.831453l0.568889 197.106872-203.846017-98.890394-2.205539-109.20041L737.743863 693.081709z m10.852649-2.406838l168.30359-38.185572 46.473846 38.7107L853.368342 662.536752z m172.294565 23.455727l0.875213 70.367179L787.604786 808.644923l-2.275555-198.157128 66.796307 63.768068zM365.261675 840.205128h675.953778a10.327521 10.327521 0 0 1 0 20.672547H365.261675a10.327521 10.327521 0 0 1 0-20.672547z m-221.656615 62.008889h305.484581a10.327521 10.327521 0 1 1 0 20.672547H143.60506a10.327521 10.327521 0 0 1 0-20.672547z m416.916786 0h760.604445a10.327521 10.327521 0 1 1 0 20.672547H560.521846a10.327521 10.327521 0 0 1 0-20.672547z m-515.177025 0h44.880957a10.327521 10.327521 0 1 1 0 20.672547H45.336068a10.327521 10.327521 0 0 1 0-20.672547zM1077.720615 840.205128h30.483693a10.327521 10.327521 0 0 1 0 20.672547h-30.483693a10.327521 10.327521 0 0 1 0-20.672547z m306.088479 62.008889h54.832137a10.327521 10.327521 0 1 1 0 20.672547h-54.832137a10.327521 10.327521 0 1 1 0-20.672547z m-337.753709 99.214222h111.589743a10.327521 10.327521 0 1 1 0 20.672547h-111.589743a10.327521 10.327521 0 1 1 0-20.672547z m-47.497847 0h16.103932a10.327521 10.327521 0 1 1 0 20.672547h-16.103932a10.327521 10.327521 0 1 1 0-20.672547z m-406.361709 0h176.303043a10.327521 10.327521 0 1 1 0 20.672547H592.187077a10.327521 10.327521 0 0 1 0-20.672547z m264.734633 0h111.598495a10.327521 10.327521 0 1 1 0 20.672547h-111.589743a10.327521 10.327521 0 0 1 0-20.672547zM296.653675 840.205128h30.483693a10.327521 10.327521 0 1 1 0 20.672547h-30.483693a10.327521 10.327521 0 0 1 0-20.672547z m200.53771 62.008889h24.190906a10.327521 10.327521 0 1 1 0 20.672547h-24.190906a10.327521 10.327521 0 0 1 0-20.672547zM117.830017 279.42947a56.56506 56.56506 0 1 1 0-113.138872 56.56506 56.56506 0 0 1 0 113.138872z m0.201299-25.862564a30.509949 30.509949 0 1 0 0-61.019897 30.509949 30.509949 0 0 0 0 61.019897z m539.219146-207.688205a5.338803 5.338803 0 1 1 0 10.686359h-40.539898v40.539897a5.338803 5.338803 0 0 1-10.686359 0V56.56506H565.475556a5.338803 5.338803 0 0 1 0-10.677607h40.548649V5.338803a5.338803 5.338803 0 0 1 10.677607 0v40.54865z m-568.477539 460.274872a3.859692 3.859692 0 0 1-0.017504 7.719384l-38.273094 0.017505v38.474393a3.859692 3.859692 0 1 1-7.719385 0v-38.509402L3.85094 513.837949a3.85094 3.85094 0 0 1 0.017504-7.719385l38.903248 0.017504v-38.413128a3.859692 3.859692 0 0 1 7.728137 0v38.439385z m1415.439316-194.735043a1.767932 1.767932 0 1 1-2.503111 2.503111l-17.53053-17.53053-17.539282 17.53053a1.767932 1.767932 0 0 1-2.503111-2.503111l17.53053-17.53053-17.53053-17.539282a1.767932 1.767932 0 0 1 2.503111-2.503111l17.539282 17.53053 17.53053-17.53053a1.767932 1.767932 0 1 1 2.503111 2.503111l-17.53053 17.539282z m-370.057846 91.634872c-4.50735-4.498598-8.997197-9.014701-13.522051-13.495795-0.498872-0.49012-0.463863-0.752684 0.017504-1.207795 1.102769-1.050256 2.144274-2.153026 3.238291-3.255795l0.560137 0.525128 13.662085 13.644581c0.455111 0.455111 0.41135 0.700171-0.017504 1.111522-1.085265 1.050256-2.135521 2.153026-3.255795 3.308308-0.297573-0.271316-0.498872-0.437607-0.682667-0.630154z m34.03706 26.002598l14.160957 14.187214c0.035009 0.035009 0.052513 0.078769 0.148787 0.253812-1.190291 1.172786-2.371829 2.363077-3.588376 3.500854-0.096274 0.087521-0.525128-0.035009-0.682667-0.192547-1.995487-1.951726-3.964718-3.938462-5.942701-5.907692l-7.719385-7.728137-0.53388-0.560136c0.096274-0.140034 0.166291-0.280068 0.262564-0.385094 1.050256-1.050256 2.091761-2.083009 3.124513-3.133265 0.262564-0.262564 0.463863-0.350085 0.770188-0.035009z m-1.076513-26.186393c-0.910222-0.980239-1.881709-1.916718-2.835692-2.853197-0.262564-0.262564-0.358838-0.463863-0.052513-0.770188l13.959658-13.942154c0.061265-0.061265 0.140034-0.096274 0.306325-0.210051 1.181538 1.190291 2.336821 2.336821 3.465846 3.509607 0.087521 0.087521 0.052513 0.350085 0.008752 0.498872-0.035009 0.113778-0.175043 0.201299-0.262564 0.28882-4.498598 4.498598-8.997197 8.979692-13.47829 13.487043-0.437607 0.446359-0.691419 0.437607-1.111522-0.008752z m-31.945299 26.326427c0.918974 0.980239 1.881709 1.907966 2.844444 2.844445 0.262564 0.262564 0.350085 0.463863 0.043761 0.77894l-13.950906 13.933402c-0.061265 0.061265-0.148786 0.105026-0.306325 0.218803-1.190291-1.190291-2.345573-2.336821-3.474598-3.509607-0.087521-0.087521-0.052513-0.350085 0-0.507624 0.026256-0.113778 0.175043-0.192547 0.262564-0.28882 4.489846-4.489846 8.988444-8.97094 13.469539-13.478291 0.437607-0.446359 0.700171-0.437607 1.111521 0z m16.742838-43.576889c0 2.818188-0.017504 5.636376 0.008752 8.454564 0.008752 0.61265-0.175043 0.805197-0.787693 0.787693a78.699214 78.699214 0 0 0-3.964717-0.008752c-0.437607 0-0.638906-0.096274-0.638906-0.586394V376.95453c0-0.472615 0.148786-0.630154 0.612649-0.61265 1.374085 0.017504 2.739419 0.026256 4.096 0 0.551385-0.026256 0.682667 0.175043 0.682667 0.682667-0.017504 2.861949-0.008752 5.723897-0.008752 8.585846z m-21.880342 26.483966a75.662222 75.662222 0 0 0 0 4.025983c0 0.463863-0.157538 0.61265-0.61265 0.61265-5.77641-0.017504-11.544068-0.017504-17.302974 0-0.498872 0-0.595145-0.210051-0.595145-0.647659 0.026256-1.365333 0.026256-2.730667 0-4.087247-0.008752-0.507624 0.157538-0.65641 0.65641-0.656411 2.853197 0.017504 5.715145 0.008752 8.577094 0.008752 2.835692 0 5.680137 0.017504 8.515829-0.008752 0.577641 0 0.787692 0.140034 0.761436 0.752684z m61.264957-0.035008c-0.035009 1.356581-0.026256 2.721915 0 4.087247 0 0.437607-0.148786 0.577641-0.586393 0.577641h-17.294222c-0.525128 0-0.638906-0.201299-0.630154-0.673914 0.026256-1.339077 0.035009-2.686906 0-4.025983-0.017504-0.53388 0.166291-0.682667 0.691419-0.682667 2.853197 0.017504 5.715145 0.008752 8.577094 0.008752 2.844444 0 5.680137 0.017504 8.515829-0.008752 0.542632 0 0.743932 0.140034 0.726427 0.717676z m-39.384615 34.745982c0 2.861949-0.017504 5.723897 0 8.577094 0.008752 0.560137-0.148786 0.743932-0.708923 0.726428a93.927932 93.927932 0 0 0-4.096 0c-0.437607 0-0.577641-0.148786-0.577641-0.586393v-17.302975c0-0.455111 0.140034-0.630154 0.612649-0.612649 1.365333 0.017504 2.730667 0.026256 4.087248 0 0.542632-0.026256 0.700171 0.157538 0.691419 0.682666-0.026256 2.835692-0.008752 5.680137-0.008752 8.515829z m360.920615 102.006154a33.721983 33.721983 0 1 1 0-67.452718 33.721983 33.721983 0 0 1 0 67.452718z m-0.026256-10.292513a23.858325 23.858325 0 1 0 0-47.716649 23.858325 23.858325 0 0 0 0 47.716649z m-420.557676-384.525128a24.488479 24.488479 0 1 1 0-48.976957 24.488479 24.488479 0 0 1 0 48.976957z m-0.262564-11.272752a13.478291 13.478291 0 1 0 0-26.939077 13.478291 13.478291 0 0 0 0 26.939077z"
            p-id="18366"
            fill="#c6e2ff"
          ></path>
        </svg>
      </p>
    </article>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, inject, nextTick, computed } from "vue";
import { useState } from "@akar/vue-hooks";
import Cookies from "js-cookie";
import { Socket } from "socket.io-client";
import { useRoute } from "vue-router";
import { ElMessage, ElPopover } from "element-plus";
import { dialogueOptions } from "../data/config";
import Api from "@/api";
import { getUuiD, getTime, createRandomId } from "@/utils";
import foundEdit from "@akar/xs-editor";
import DialogueExpression from "./DialogueExpression.vue";
const svg = `
  <svg t="1653073827880" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="32474" width="32" height="32"><path d="M511.999 89.638C282.053 89.638 95.035 273.4 89.763 502.08c4.884-199.52 156.598-359.646 343.044-359.646 189.526 0 343.169 165.46 343.169 369.566 0 43.738 35.456 79.193 79.193 79.193 43.738 0 79.193-35.455 79.193-79.193 0-233.264-189.097-422.362-422.363-422.362z m0 844.724c229.947 0 416.967-183.763 422.238-412.44-4.884 199.52-156.599 359.645-343.045 359.645-189.527 0-343.17-165.459-343.17-369.566 0-43.737-35.455-79.193-79.192-79.193S89.637 468.263 89.637 512c0 233.266 189.098 422.362 422.362 422.362z" p-id="32475" fill="#a0cfff"></path></svg>
`;
const route = useRoute();
const socket = inject("socket") as Socket;
const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");

const [loading, setLoading] = useState(true);
const [navData, setNavData] = useState({});
const [curKey, setCurkey] = useState("");
const [curList, setCurList] = useState([]);

const uploadSuccess = (response: any) => {
  const news = {
    formUid: new Date().getTime(), // id
    formUserId: userInfo.userName, //
    groupId: getUuiD(), //
    message: encodeURI(`<img src="${response.data[0]}" >`), //
    msgType: 1,
    sendTime: getTime(),
    needFeedBack: false,
    sid: curKey.value,
  };
  socket.emit("letter", news);
};
const getUploadUrl = () => `${import.meta.env.VITE_BASE_API}/upload/setPackages?superior=_section`;
// 聚焦
const createFocus = () => {
  setTimeout(() => (document.querySelector(".xs-editor-container") as any).focus());
};
const saveData = (el) => {
  /** 第一步与我相关的数据入队 */
  let newPer = true;
  Object.entries(navData.value).forEach(([key, list]) => {
    if (el.sid === userInfo.userName || el.formUserId === userInfo.userName) {
      if (el.sid === userInfo.userName && el.formUserId === key) {
        // 发给我的
        (list as any).push(el);
        newPer = false;
      } else if (el.formUserId === userInfo.userName && el.sid === key) {
        // 我发出的
        (list as any).push(el);
      }
      if (
        Object.keys(navData.value).includes(el.formUserId) ||
        el.formUserId === userInfo.userName
      ) {
        newPer = false;
      }
    } else {
      newPer = false;
    }
  });
  if (newPer) {
    navData.value[el.formUserId] = [el];
  }
  /** 第二步左侧导航栏排序 */
  if (el.formUserId === userInfo.userName) {
    const temData = {};
    const oldKeys = Object.keys(navData.value);
    oldKeys.splice(oldKeys.indexOf(el.sid), 1);
    const newKeys = [el.sid, ...oldKeys];
    newKeys.forEach((i) => {
      temData[i] = navData.value[i];
    });
    setNavData(temData);
  } else if (el.sid === userInfo.userName) {
    const temData = {};
    const oldKeys = Object.keys(navData.value);
    oldKeys.splice(oldKeys.indexOf(el.formUserId), 1);
    const newKeys = [el.formUserId, ...oldKeys];
    newKeys.forEach((i) => {
      temData[i] = navData.value[i] || [el];
    });
    handleChange(el.formUserId, navData.value[el.formUserId]);
    setNavData(temData);
  }
  scrollBottom(100);
};
const initSocketIo = async () => {
  // 加入通信
  socket.on("letter", (payload) => {
    // ElMessage.success(
    //   `${payload.formUserId}发了一条消息给${payload.sid}：【${payload.message}】 -- ${payload.sendTime}`
    // );
    saveData(payload);
  });
  // 初始化消息列表
  const { data } = await Api.getNewsUserList();
  setNavData(data);
  if (route.params.uid && route.params.uid != 0) {
    if (!!navData.value[route.params.uid]) {
      setCurkey(route.params.uid);
      setCurList(navData.value[route.params.uid]);
    } else {
      navData.value[route.params.uid] = [];
      setCurkey(route.params.uid);
      setCurList(navData.value[route.params.uid]);
    }
  } else {
    setCurkey(Object.keys(data)[0]);
    setCurList(Object.values(data)[0]);
  }
  if (curKey.value) {
    scrollBottom(800);
  } else {
    setLoading(false);
  }
};
// 置底
const scrollToBottom = () => {
  const domWrapper: Element | any = document.querySelector(".dialogue-con__content"); // 外层容器 出现滚动条的dom
  (function smoothscroll() {
    const currentScroll = domWrapper.scrollTop; // 已经被卷掉的高度
    const clientHeight = domWrapper.offsetHeight; // 容器高度
    const scrollHeight = domWrapper.scrollHeight; // 内容总高度
    if (scrollHeight - 10 > currentScroll + clientHeight) {
      window.requestAnimationFrame(smoothscroll);
      domWrapper.scrollTo(0, currentScroll + (scrollHeight - currentScroll - clientHeight) / 2);
    }
    setLoading(false);
  })();
};
const scrollBottom = async (dy) => {
  await nextTick();
  setTimeout(scrollToBottom, dy);
  foundTextarea(null);
};
const handleChange = (key, ev) => {
  setLoading(true);
  setCurkey(key);
  setCurList(ev);
  scrollBottom(800);
};
// 创建输入框
const foundTextarea = (value) => {
  foundEdit(
    document.querySelector("#notice-textarea"),
    {
      value,
      operable: false,
      pattern: "classic", // silent | classic
      upFileUrl: `${import.meta.env.VITE_BASE_API}/upload/setPackages?superior=_section`,
      onKeyEnter: (html) => {
        if (!html.trim()) {
          ElMessage.warning("不能发送空消息");
        } else {
          const news = {
            formUid: new Date().getTime(), // id
            formUserId: userInfo.userName, //
            groupId: getUuiD(), //
            message: encodeURI(html.trim()), //
            msgType: 1,
            sendTime: getTime(),
            needFeedBack: false,
            sid: curKey.value,
          };
          socket.emit("letter", news);
        }
        setTimeout(() => foundTextarea(""));
      },
    },
    createFocus
  );
};

onMounted(() => {
  initSocketIo();
});
</script>

<style lang="scss" scoped>
.nowrap {
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  text-overflow: ellipsis;
  &:deep() img {
    max-width: 12px !important;
    min-width: 12px !important;
  }
}
.dialogue-container {
  width: 100%;
  height: 100%;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.18);
  max-height: 777px;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  .dialogue-nav {
    width: 210px;
    background-color: var(--xs-color-info-dark-2);
    height: 100%;
    display: flex;
    color: #fff;
    flex-direction: column;
    &__header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      border-bottom: calc(1px / 4) solid rgb(168, 163, 163);
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      .left {
        display: flex;
        height: 100%;
        width: 100%;
        padding: 12px;
        align-items: center;
        img {
          width: 36px;
          height: 36px;
          margin-right: 12px;
          display: block;
          border-radius: 50%;
        }
        span {
          flex: 1;
        }
      }
    }
    &__list {
      width: 100%;
      flex: 1;
      li {
        width: 100%;
        border-bottom: 1px solid rgb(80, 77, 77);
        display: flex;
        align-items: center;
        transition: 0.3s;
        height: 56px;
        display: flex;
        padding: 2px 12px;
        cursor: pointer;
        .left {
          img {
            width: 32px;
            height: 32px;
            display: block;
            border-radius: 50%;
            margin-right: 12px;
          }
        }
        .right {
          flex: 1;
          height: 100%;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          padding: 8px 0;
          align-items: flex-start;
          justify-content: space-between;
        }
        &:hover {
          background-color: #333;
        }
      }
    }
  }
  .dialogue-con {
    flex: 1;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    &__header {
      height: 44px;
      line-height: 44px;
      padding-left: 24px;
      font-weight: 500;
      border-bottom: 0.5px solid rgb(209, 198, 198);
    }
    &__content {
      height: 64%;
      overflow-y: auto;
      padding-bottom: 12px;
      transition: all 0.4s;
      article {
        width: 100%;
        margin: 16px 0;
        img {
          width: 30px;
          height: 30px;
          margin: 0 12px;
          border-radius: 50%;
        }
        &:deep() img {
          max-width: 200px !important;
        }
      }
      .self {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
      }
      .outher {
        justify-content: flex-start;
        align-items: flex-end;
      }
      span {
        display: inline-block;
        padding: 12px;
        background-color: whitesmoke;
        max-width: 70%;
        border-radius: 6px;
      }
    }
    &__footer {
      flex: 1;
      border-top: 1px solid rgb(228, 221, 221);
      display: flex;
      flex-direction: column;
      .options {
        line-height: 36px;
        padding: 0 6px 0 6px;
        display: flex;
        nav {
          margin-left: 12px;
          cursor: pointer;
          span {
            display: grid;
            place-content: center;
            height: 100%;
          }
        }
      }
      #notice-textarea {
        border: none;
        outline: none;
        z-index: 1;
        height: 100%;
        max-height: 156px;
        overflow-y: auto;
        width: 100%;
        background: #fff;
        .xs-editor-container {
          img {
            max-width: 100px !important;
          }
        }
      }
    }
  }
  .empty {
    width: 100%;
    height: 100%;
    display: grid;
    place-content: center;
  }
}

.nav-cur {
  background: #333;
}
</style>
